"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphSubsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const graphSubs_model_1 = require("./graphSubs.model");
const eventRegs_model_1 = require("../eventRegs/eventRegs.model");
const mongoose_1 = require("mongoose");
const schedule_service_1 = require("../schedule/schedule.service");
const graph_model_1 = require("../graph/graph.model");
const event_service_1 = require("../event/event.service");
const eventRegs_service_1 = require("../eventRegs/eventRegs.service");
const user_model_1 = require("../user/user.model");
const redis_service_1 = require("../redis/redis.service");
let GraphSubsService = class GraphSubsService {
    constructor(graphSubsModel, GraphModel, UserModel, eventRegsModel, scheduleService, eventService, eventRegsService, redisService) {
        this.graphSubsModel = graphSubsModel;
        this.GraphModel = GraphModel;
        this.UserModel = UserModel;
        this.eventRegsModel = eventRegsModel;
        this.scheduleService = scheduleService;
        this.eventService = eventService;
        this.eventRegsService = eventRegsService;
        this.redisService = redisService;
    }
    async invalidateUserSubscriptionsCache(userId) {
        const cacheKey = `userSubs:${userId.toString()}`;
        await this.redisService.del(cacheKey);
        console.log(`🗑️ Redis CACHE INVALIDATED: ${cacheKey}`);
    }
    async invalidateGraphCache(graphId) {
        const graphCacheKey = `graph:getGraphById:{"id":"${graphId.toString()}"}`;
        await this.redisService.del(graphCacheKey);
        console.log(`🗑️ Redis GRAPH CACHE INVALIDATED: ${graphCacheKey}`);
        await this.redisService.delPattern('graph:getParentGraphs:*');
        await this.redisService.delPattern('graph:getGlobalGraphs:*');
        console.log(`🗑️ Redis GRAPH LISTS CACHE INVALIDATED: All graph lists`);
    }
    async toggleSub(user, graph) {
        const session = await this.graphSubsModel.db.startSession();
        try {
            return await session.withTransaction(async () => {
                const deletedSub = await this.graphSubsModel
                    .findOneAndDelete({ user, graph })
                    .session(session)
                    .lean()
                    .exec();
                if (deletedSub) {
                    await Promise.all([
                        this.GraphModel.findByIdAndUpdate(graph, { $inc: { subsNum: -1 } }, { session, lean: true }).exec(),
                        this.UserModel.findByIdAndUpdate(user, { $inc: { graphSubsNum: -1 } }, { session, lean: true }).exec()
                    ]);
                    await Promise.all([
                        this.invalidateUserSubscriptionsCache(user),
                        this.invalidateGraphCache(graph)
                    ]);
                    return { subscribed: false };
                }
                else {
                    await Promise.all([
                        this.graphSubsModel.create([{ user, graph }], { session }),
                        this.GraphModel.findByIdAndUpdate(graph, { $inc: { subsNum: 1 } }, { session, lean: true }).exec(),
                        this.UserModel.findByIdAndUpdate(user, { $inc: { graphSubsNum: 1 } }, { session, lean: true }).exec()
                    ]);
                    await Promise.all([
                        this.invalidateUserSubscriptionsCache(user),
                        this.invalidateGraphCache(graph)
                    ]);
                    return { subscribed: true };
                }
            });
        }
        catch (error) {
            console.error('Error in toggleSub:', error);
            throw new common_1.InternalServerErrorException('Ошибка при переключении подписки');
        }
        finally {
            await session.endSession();
        }
    }
    async getSubsSchedule(userId) {
        try {
            const subscribedGraphs = await this.graphSubsModel
                .find({ user: userId })
                .select('graph')
                .lean()
                .exec();
            const subscribedGraphIds = [...new Set(subscribedGraphs.map(sub => sub.graph))];
            const [schedule, userEvents] = await Promise.all([
                subscribedGraphIds.length > 0
                    ? this.scheduleService.getWeekdaySchedulesByGraphs(subscribedGraphIds.map(id => id.toString()))
                    : Promise.resolve([]),
                this.eventRegsService.getEventsByUserId(userId)
            ]);
            const mergedEvents = userEvents.map((reg) => ({
                ...reg.eventId,
                isAttended: true
            }));
            return {
                schedule,
                events: mergedEvents
            };
        }
        catch (error) {
            console.error('Error in getSubsSchedule:', error);
            throw new common_1.InternalServerErrorException('Ошибка при получении расписания подписок');
        }
    }
    async getSubsEvents(userId) {
        const [subscribedGraphs, userEventRegs] = await Promise.all([
            this.graphSubsModel.aggregate([
                { $match: { user: userId } },
                { $group: { _id: '$graph' } },
                { $project: { _id: 1 } }
            ]).exec(),
            this.eventRegsModel
                .find({ userId })
                .select('eventId')
                .lean()
                .exec()
        ]);
        const graphIds = subscribedGraphs?.length > 0
            ? subscribedGraphs.map(graph => graph._id.toString())
            : [];
        if (graphIds.length === 0) {
            return [];
        }
        const events = await this.eventService.getEventsByGraphsIds(graphIds);
        const attendedEventIds = new Set(userEventRegs.map(reg => reg.eventId.toString()));
        const eventsWithAttendance = events.map(event => ({
            ...event,
            isAttended: attendedEventIds.has(event._id.toString())
        }));
        return eventsWithAttendance;
    }
    async isUserSubsExists(graph, userId) {
        try {
            const exists = await this.graphSubsModel
                .findOne({
                graph: new mongoose_1.Types.ObjectId(graph),
                user: new mongoose_1.Types.ObjectId(userId),
            }, { _id: 1 })
                .lean()
                .exec();
            return !!exists;
        }
        catch (error) {
            console.error('Error in isUserSubsExists:', error);
            return false;
        }
    }
    async toggleSubBulk(user, graph) {
        const session = await this.graphSubsModel.db.startSession();
        try {
            return await session.withTransaction(async () => {
                const deleteResult = await this.graphSubsModel
                    .deleteOne({ user, graph })
                    .session(session)
                    .exec();
                if (deleteResult.deletedCount > 0) {
                    const bulkOps = [
                        {
                            updateOne: {
                                filter: { _id: graph },
                                update: { $inc: { subsNum: -1 } }
                            }
                        }
                    ];
                    const userBulkOps = [
                        {
                            updateOne: {
                                filter: { _id: user },
                                update: { $inc: { graphSubsNum: -1 } }
                            }
                        }
                    ];
                    await Promise.all([
                        this.GraphModel.bulkWrite(bulkOps, { session }),
                        this.UserModel.bulkWrite(userBulkOps, { session })
                    ]);
                    await Promise.all([
                        this.invalidateUserSubscriptionsCache(user),
                        this.invalidateGraphCache(graph)
                    ]);
                    return { subscribed: false };
                }
                else {
                    const bulkOps = [
                        {
                            updateOne: {
                                filter: { _id: graph },
                                update: { $inc: { subsNum: 1 } }
                            }
                        }
                    ];
                    const userBulkOps = [
                        {
                            updateOne: {
                                filter: { _id: user },
                                update: { $inc: { graphSubsNum: 1 } }
                            }
                        }
                    ];
                    await Promise.all([
                        this.graphSubsModel.create([{ user, graph }], { session }),
                        this.GraphModel.bulkWrite(bulkOps, { session }),
                        this.UserModel.bulkWrite(userBulkOps, { session })
                    ]);
                    await Promise.all([
                        this.invalidateUserSubscriptionsCache(user),
                        this.invalidateGraphCache(graph)
                    ]);
                    return { subscribed: true };
                }
            });
        }
        catch (error) {
            console.error('Error in toggleSubBulk:', error);
            throw new common_1.InternalServerErrorException('Ошибка при переключении подписки');
        }
        finally {
            await session.endSession();
        }
    }
};
exports.GraphSubsService = GraphSubsService;
exports.GraphSubsService = GraphSubsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(graphSubs_model_1.GraphSubsModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(graph_model_1.GraphModel)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __param(3, (0, nestjs_typegoose_1.InjectModel)(eventRegs_model_1.EventRegsModel)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, schedule_service_1.ScheduleService,
        event_service_1.EventService,
        eventRegs_service_1.EventRegsService,
        redis_service_1.RedisService])
], GraphSubsService);
//# sourceMappingURL=graphSubs.service.js.map
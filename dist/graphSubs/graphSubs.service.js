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
const mongoose_1 = require("mongoose");
const schedule_service_1 = require("../schedule/schedule.service");
const graph_model_1 = require("../graph/graph.model");
const event_service_1 = require("../event/event.service");
const eventRegs_service_1 = require("../eventRegs/eventRegs.service");
const user_model_1 = require("../user/user.model");
let GraphSubsService = class GraphSubsService {
    constructor(graphSubsModel, GraphModel, UserModel, scheduleService, eventService, eventRegsService) {
        this.graphSubsModel = graphSubsModel;
        this.GraphModel = GraphModel;
        this.UserModel = UserModel;
        this.scheduleService = scheduleService;
        this.eventService = eventService;
        this.eventRegsService = eventRegsService;
    }
    async toggleSub(user, graph) {
        console.log('toggleSub', user, graph);
        try {
            const existingSub = await this.graphSubsModel
                .findOne({ user, graph })
                .lean()
                .exec();
            if (existingSub) {
                await Promise.all([
                    this.GraphModel.findOneAndUpdate({ _id: graph }, { $inc: { subsNum: -1 } }, { lean: true }).exec(),
                    this.graphSubsModel.deleteOne({ user, graph }).exec(),
                    this.UserModel.findOneAndUpdate({ _id: user }, { $inc: { graphSubsNum: -1 } }).exec()
                ]);
            }
            else {
                await Promise.all([
                    this.GraphModel.findOneAndUpdate({ _id: graph }, { $inc: { subsNum: 1 } }, { lean: true }).exec(),
                    this.graphSubsModel.create({ user, graph }),
                    this.UserModel.findOneAndUpdate({ _id: user }, { $inc: { graphSubsNum: 1 } }).exec()
                ]);
            }
        }
        catch (error) {
            console.error('Error in toggleSub:', error);
            throw new common_1.InternalServerErrorException('Ошибка при переключении подписки');
        }
    }
    async getSubsSchedule(userId) {
        try {
            const subscribedGraphs = await this.graphSubsModel.aggregate([
                { $match: { user: userId } },
                { $group: { _id: '$graph' } },
                { $project: { _id: 1 } }
            ]).exec();
            const graphIds = subscribedGraphs?.length > 0
                ? subscribedGraphs.map(graph => graph._id.toString())
                : [];
            const [schedule, userEvents] = await Promise.all([
                graphIds.length > 0
                    ? this.scheduleService.getWeekdaySchedulesByGraphs(graphIds)
                    : Promise.resolve([]),
                this.eventRegsService.getEventsByUserId(userId)
            ]);
            const mergedEvents = userEvents.map((reg) => ({
                ...reg.eventId,
                isAttended: true
            }));
            return {
                schedule: schedule || [],
                events: mergedEvents
            };
        }
        catch (error) {
            console.error('Error in getSubsSchedule:', error);
            throw new common_1.InternalServerErrorException('Ошибка при получении расписания подписок');
        }
    }
    async getSubsEvents(userId) {
        const subscribedGraphs = await this.graphSubsModel.aggregate([
            { $match: { user: userId } },
            { $group: { _id: '$graph' } },
            { $project: { _id: 1 } }
        ]).exec();
        const graphIds = subscribedGraphs?.length > 0
            ? subscribedGraphs.map(graph => graph._id.toString())
            : [];
        const events = await this.eventService.getEventsByGraphsIds(graphIds);
        const eventsWithAttendance = await Promise.all(events.map(async (event) => {
            const isAttended = await this.eventRegsService.isUserAttendingEvent(userId, event._id);
            return {
                ...event,
                isAttended
            };
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
};
exports.GraphSubsService = GraphSubsService;
exports.GraphSubsService = GraphSubsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(graphSubs_model_1.GraphSubsModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(graph_model_1.GraphModel)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, Object, Object, schedule_service_1.ScheduleService,
        event_service_1.EventService,
        eventRegs_service_1.EventRegsService])
], GraphSubsService);
//# sourceMappingURL=graphSubs.service.js.map
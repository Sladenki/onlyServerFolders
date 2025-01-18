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
const post_service_1 = require("../post/post.service");
const schedule_service_1 = require("../schedule/schedule.service");
const graph_model_1 = require("../graph/graph.model");
let GraphSubsService = class GraphSubsService {
    constructor(graphSubsModel, GraphModel, postService, scheduleService) {
        this.graphSubsModel = graphSubsModel;
        this.GraphModel = GraphModel;
        this.postService = postService;
        this.scheduleService = scheduleService;
    }
    async toggleSub(user, graph) {
        const isSubExists = await this.graphSubsModel.findOne({ user, graph }).exec();
        if (isSubExists) {
            await Promise.all([
                this.GraphModel.findOneAndUpdate({ _id: graph }, { $inc: { subsNum: -1 } }).exec(),
                this.graphSubsModel.deleteOne({ user, graph })
            ]);
        }
        else {
            await Promise.all([
                this.GraphModel.findOneAndUpdate({ _id: graph }, { $inc: { subsNum: 1 } }).exec(),
                this.graphSubsModel.create({ user, graph })
            ]);
        }
    }
    async getSubsPosts(skip, userId) {
        const skipPosts = skip ? Number(skip) : 0;
        const subscribedGraphs = await this.graphSubsModel
            .find({ user: userId })
            .distinct('graph');
        const posts = await this.postService.getPostsFromSubscribedGraphs(skipPosts, subscribedGraphs, userId);
        return posts;
    }
    async getSubsSchedule(userId) {
        const subscribedGraphs = await this.graphSubsModel
            .find({ user: userId })
            .distinct('graph');
        const posts = await this.scheduleService.getWeekdaySchedulesByGraphs(subscribedGraphs);
        return posts;
    }
    async isUserSubsExists(graph, userId) {
        const reaction = await this.graphSubsModel
            .findOne({
            graph: new mongoose_1.Types.ObjectId(graph),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        return !!reaction;
    }
};
exports.GraphSubsService = GraphSubsService;
exports.GraphSubsService = GraphSubsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(graphSubs_model_1.GraphSubsModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(graph_model_1.GraphModel)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => post_service_1.PostService))),
    __metadata("design:paramtypes", [Object, Object, post_service_1.PostService,
        schedule_service_1.ScheduleService])
], GraphSubsService);
//# sourceMappingURL=graphSubs.service.js.map
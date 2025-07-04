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
exports.GraphService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const graph_model_1 = require("./graph.model");
const graphSubs_model_1 = require("../graphSubs/graphSubs.model");
const graphSubs_service_1 = require("../graphSubs/graphSubs.service");
const s3_service_1 = require("../s3/s3.service");
let GraphService = class GraphService {
    constructor(GraphModel, graphSubsModel, graphSubsService, s3Service) {
        this.GraphModel = GraphModel;
        this.graphSubsModel = graphSubsModel;
        this.graphSubsService = graphSubsService;
        this.s3Service = s3Service;
    }
    async createGraph(dto, userId, image) {
        let imgPath;
        if (image) {
            const fileExtension = image.originalname.split('.').pop();
            const fileName = `${dto.name}.${fileExtension}`;
            const s3Path = `graphAva/${fileName}`;
            const uploadResult = await this.s3Service.uploadFile(image, s3Path);
            imgPath = `images/${s3Path}`;
        }
        const graph = await this.GraphModel.create({
            ...dto,
            ownerUserId: userId,
            imgPath,
            graphType: "default",
            globalGraphId: dto.globalGraphId
        });
        if (dto.parentGraphId) {
            await this.GraphModel.findByIdAndUpdate(dto.parentGraphId, {
                $inc: { childGraphNum: 1 },
            }).exec();
        }
        return graph;
    }
    async getGraphById(id) {
        return this.GraphModel.findById(id).populate('parentGraphId', 'name');
    }
    async getParentGraphs(skip, userId) {
        if (!userId) {
            return this.GraphModel
                .find()
                .skip(Number(skip) || 0)
                .lean()
                .exec();
        }
        const [graphs, userSubscriptions] = await Promise.all([
            this.GraphModel
                .find()
                .skip(Number(skip) || 0)
                .lean()
                .exec(),
            this.graphSubsModel
                .find({ user: userId })
                .select('graph')
                .lean()
                .exec()
        ]);
        const subscribedGraphIds = new Set(userSubscriptions.map(sub => sub.graph.toString()));
        const graphsWithSubscription = graphs.map(graph => ({
            ...graph,
            isSubscribed: subscribedGraphIds.has(graph._id.toString())
        }));
        return graphsWithSubscription;
    }
    async getAllChildrenGraphs(parentGraphId, skip, userId) {
        if (!userId) {
            return this.GraphModel
                .find({
                globalGraphId: parentGraphId,
                graphType: 'default'
            })
                .skip(Number(skip) || 0)
                .lean()
                .exec();
        }
        const [graphs, userSubscriptions] = await Promise.all([
            this.GraphModel
                .find({
                globalGraphId: parentGraphId,
                graphType: 'default'
            })
                .skip(Number(skip) || 0)
                .lean()
                .exec(),
            this.graphSubsModel
                .find({ user: userId })
                .select('graph')
                .lean()
                .exec()
        ]);
        const subscribedGraphIds = new Set(userSubscriptions.map(sub => sub.graph.toString()));
        const graphsWithSubscription = graphs.map(graph => ({
            ...graph,
            isSubscribed: subscribedGraphIds.has(graph._id.toString())
        }));
        return graphsWithSubscription;
    }
    async getAllChildrenByTopic(parentGraphId) {
        const childrenGraphs = this.GraphModel.find({
            parentGraphId: parentGraphId,
            graphType: 'default'
        }).lean();
        return childrenGraphs;
    }
    async getAllChildrenByGlobal(globalGraphId) {
        const [globalGraph, childrenGraphs] = await Promise.all([
            this.GraphModel.findOne({
                _id: globalGraphId,
                graphType: 'global'
            }).lean(),
            this.GraphModel.find({
                globalGraphId: globalGraphId,
                graphType: 'default'
            }).lean()
        ]);
        return globalGraph ? [globalGraph, ...childrenGraphs] : childrenGraphs;
    }
    async getTopicGraphs(parentGraphId) {
        const pipeline = [
            {
                $match: {
                    graphType: 'topic',
                    parentGraphId: parentGraphId
                }
            },
        ];
        return this.GraphModel.aggregate(pipeline).exec();
    }
    async createGlobalGraph(dto, userId, image) {
        let imgPath;
        if (image) {
            const fileExtension = image.originalname.split('.').pop();
            const fileName = `${dto.name}.${fileExtension}`;
            const s3Path = `graphAva/${fileName}`;
            const uploadResult = await this.s3Service.uploadFile(image, s3Path);
            imgPath = `images/${s3Path}`;
        }
        const graph = await this.GraphModel.create({
            name: dto.name,
            city: dto.city,
            ownerUserId: userId,
            imgPath,
            graphType: "global"
        });
        return graph;
    }
    async createTopicGraph(dto, userId, image) {
        let imgPath;
        if (image) {
            const fileExtension = image.originalname.split('.').pop();
            const fileName = `${dto.name}.${fileExtension}`;
            const s3Path = `graphAva/${fileName}`;
            const uploadResult = await this.s3Service.uploadFile(image, s3Path);
            imgPath = `images/${s3Path}`;
        }
        const graph = await this.GraphModel.create({
            ...dto,
            ownerUserId: userId,
            imgPath,
            globalGraphId: dto.parentGraphId,
            graphType: "topic"
        });
        await this.GraphModel.findByIdAndUpdate(dto.parentGraphId, {
            $inc: { childGraphNum: 1 },
        }).exec();
        return graph;
    }
    async getGlobalGraphs() {
        return this.GraphModel.find({ graphType: 'global' })
            .sort({ name: 1 })
            .lean()
            .exec();
    }
    async getTopicGraphsWithMain(globalGraphId) {
        const [globalGraph, topicGraphs] = await Promise.all([
            this.GraphModel.findOne({
                _id: globalGraphId,
                graphType: 'global'
            }).lean(),
            this.GraphModel.find({
                parentGraphId: globalGraphId,
                graphType: 'topic'
            }).sort({ name: 1 }).lean()
        ]);
        return {
            globalGraph,
            topicGraphs
        };
    }
};
exports.GraphService = GraphService;
exports.GraphService = GraphService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(graph_model_1.GraphModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(graphSubs_model_1.GraphSubsModel)),
    __metadata("design:paramtypes", [Object, Object, graphSubs_service_1.GraphSubsService,
        s3_service_1.S3Service])
], GraphService);
//# sourceMappingURL=graph.service.js.map
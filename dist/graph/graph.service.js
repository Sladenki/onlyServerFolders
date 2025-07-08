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
const redis_service_1 = require("../redis/redis.service");
let GraphService = class GraphService {
    constructor(GraphModel, graphSubsModel, graphSubsService, s3Service, redisService) {
        this.GraphModel = GraphModel;
        this.graphSubsModel = graphSubsModel;
        this.graphSubsService = graphSubsService;
        this.s3Service = s3Service;
        this.redisService = redisService;
        this.GRAPH_CACHE_TTL = 7 * 24 * 60 * 60;
        this.USER_SUBS_CACHE_TTL = 5 * 60;
    }
    generateCacheKey(method, params) {
        const paramsString = JSON.stringify(params);
        return `graph:${method}:${paramsString}`;
    }
    async invalidateGraphCache() {
        await this.redisService.delPattern('graph:*');
    }
    async getUserSubscriptions(userId) {
        const cacheKey = `userSubs:${userId.toString()}`;
        const cachedSubs = await this.redisService.get(cacheKey);
        if (cachedSubs && Array.isArray(cachedSubs)) {
            console.log(`📖 Redis CACHE HIT: ${cacheKey} (${cachedSubs.length} подписок)`);
            return new Set(cachedSubs);
        }
        const userSubscriptions = await this.graphSubsModel
            .find({ user: userId })
            .select('graph')
            .lean()
            .exec();
        const subscribedGraphIds = userSubscriptions.map(sub => sub.graph.toString());
        await this.redisService.set(cacheKey, subscribedGraphIds, this.USER_SUBS_CACHE_TTL);
        console.log(`📝 Redis CACHE MISS: ${cacheKey} (${subscribedGraphIds.length} подписок сохранено в кэш)`);
        return new Set(subscribedGraphIds);
    }
    async invalidateUserSubscriptionsCache(userId) {
        const cacheKey = `userSubs:${userId.toString()}`;
        await this.redisService.del(cacheKey);
    }
    addSubscriptionInfo(graphs, subscribedGraphIds) {
        return graphs.map(graph => ({
            ...graph,
            isSubscribed: subscribedGraphIds.has(graph._id.toString())
        }));
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
        await this.invalidateGraphCache();
        return graph;
    }
    async getGraphById(id) {
        const cacheKey = this.generateCacheKey('getGraphById', { id: id.toString() });
        const cachedGraph = await this.redisService.get(cacheKey);
        if (cachedGraph) {
            return cachedGraph;
        }
        const graph = await this.GraphModel.findById(id).populate('parentGraphId', 'name');
        if (graph) {
            await this.redisService.set(cacheKey, graph, this.GRAPH_CACHE_TTL);
        }
        return graph;
    }
    async getParentGraphs(skip, userId) {
        const cacheKey = this.generateCacheKey('getParentGraphs', {
            skip: Number(skip) || 0
        });
        let graphs = await this.redisService.get(cacheKey);
        if (!graphs || !Array.isArray(graphs)) {
            graphs = await this.GraphModel
                .find()
                .skip(Number(skip) || 0)
                .lean()
                .exec();
            await this.redisService.set(cacheKey, graphs, 86400);
        }
        if (!userId) {
            return graphs;
        }
        const subscribedGraphIds = await this.getUserSubscriptions(userId);
        return this.addSubscriptionInfo(graphs, subscribedGraphIds);
    }
    async getAllChildrenGraphs(parentGraphId, skip, userId) {
        const cacheKey = this.generateCacheKey('getAllChildrenGraphs', {
            parentGraphId: parentGraphId.toString(),
            skip: Number(skip) || 0
        });
        let graphs = await this.redisService.get(cacheKey);
        if (!graphs || !Array.isArray(graphs)) {
            graphs = await this.GraphModel
                .find({
                globalGraphId: parentGraphId,
                graphType: 'default'
            })
                .skip(Number(skip) || 0)
                .lean()
                .exec();
            await this.redisService.set(cacheKey, graphs, 86400);
        }
        if (!userId) {
            return graphs;
        }
        const subscribedGraphIds = await this.getUserSubscriptions(userId);
        return this.addSubscriptionInfo(graphs, subscribedGraphIds);
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
        await this.invalidateGraphCache();
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
        await this.invalidateGraphCache();
        return graph;
    }
    async getGlobalGraphs() {
        const cacheKey = this.generateCacheKey('getGlobalGraphs', {});
        const cachedGraphs = await this.redisService.get(cacheKey);
        if (cachedGraphs) {
            return cachedGraphs;
        }
        const graphs = await this.GraphModel.find({ graphType: 'global' })
            .sort({ name: 1 })
            .lean()
            .exec();
        await this.redisService.set(cacheKey, graphs, 86400);
        return graphs;
    }
    async getTopicGraphsWithMain(globalGraphId) {
        const cacheKey = this.generateCacheKey('getTopicGraphsWithMain', {
            globalGraphId: globalGraphId.toString()
        });
        const cachedResult = await this.redisService.get(cacheKey);
        if (cachedResult) {
            return cachedResult;
        }
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
        const result = {
            globalGraph,
            topicGraphs
        };
        await this.redisService.set(cacheKey, result, 86400);
        return result;
    }
};
exports.GraphService = GraphService;
exports.GraphService = GraphService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(graph_model_1.GraphModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(graphSubs_model_1.GraphSubsModel)),
    __metadata("design:paramtypes", [Object, Object, graphSubs_service_1.GraphSubsService,
        s3_service_1.S3Service,
        redis_service_1.RedisService])
], GraphService);
//# sourceMappingURL=graph.service.js.map
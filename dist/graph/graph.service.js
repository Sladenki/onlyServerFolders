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
let GraphService = class GraphService {
    constructor(GraphModel) {
        this.GraphModel = GraphModel;
    }
    async createGraph(dto) {
        const graph = await this.GraphModel.create(dto);
        return graph;
    }
    async getGraphById(id) {
        return this.GraphModel.findById(id).populate('parentGraphId', 'name');
    }
    async getParentGraphs() {
        return this.GraphModel.find({ parentGraphId: { $exists: false } }).exec();
    }
    async getAllChildrenGraphs(parentGraphId) {
        console.log('parentGraphId', parentGraphId);
        return this.GraphModel.find({ parentGraphId }).exec();
    }
    async createChildGraph(name, parentGraphId) {
        console.log('createChildGraph', name, parentGraphId);
        const childGraph = await this.GraphModel.create({ name, parentGraphId });
        await this.GraphModel.findByIdAndUpdate(parentGraphId, {
            $inc: { childGraphNum: 1 },
        }).exec();
        return childGraph;
    }
};
exports.GraphService = GraphService;
exports.GraphService = GraphService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(graph_model_1.GraphModel)),
    __metadata("design:paramtypes", [Object])
], GraphService);
//# sourceMappingURL=graph.service.js.map
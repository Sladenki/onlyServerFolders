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
exports.GraphController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const auth_decorator_1 = require("../decorators/auth.decorator");
const currentUser_decorator_1 = require("../decorators/currentUser.decorator");
const create_graph_dto_1 = require("./dto/create-graph.dto");
const graph_service_1 = require("./graph.service");
let GraphController = class GraphController {
    constructor(graphService) {
        this.graphService = graphService;
    }
    async createGraph(userId, dto) {
        return this.graphService.createGraph(dto, userId);
    }
    async getGraphById(id) {
        return this.graphService.getGraphById(new mongoose_1.Types.ObjectId(id));
    }
    async getParentGraphs(skip) {
        return this.graphService.getParentGraphs(skip);
    }
    async getParentGraphsAuth(skip, userId) {
        return this.graphService.getParentGraphsAuth(skip, userId);
    }
    async getAllChildrenGraphs(parentGraphId) {
        return this.graphService.getAllChildrenGraphs(new mongoose_1.Types.ObjectId(parentGraphId));
    }
};
exports.GraphController = GraphController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, create_graph_dto_1.CreateGraphDto]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "createGraph", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getGraphById", null);
__decorate([
    (0, common_1.Get)('getParentGraphs'),
    __param(0, (0, common_1.Query)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getParentGraphs", null);
__decorate([
    (0, common_1.Get)('getParentGraphsAuth'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getParentGraphsAuth", null);
__decorate([
    (0, common_1.Get)('getAllChildrenGraphs/:parentGraphId'),
    __param(0, (0, common_1.Param)('parentGraphId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getAllChildrenGraphs", null);
exports.GraphController = GraphController = __decorate([
    (0, common_1.Controller)('graph'),
    __metadata("design:paramtypes", [graph_service_1.GraphService])
], GraphController);
//# sourceMappingURL=graph.controller.js.map
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
const optionalAuth_decorator_1 = require("../decorators/optionalAuth.decorator");
const optional_auth_context_decorator_1 = require("../decorators/optional-auth-context.decorator");
const optionalAuth_guard_1 = require("../guards/optionalAuth.guard");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const graph_service_1 = require("./graph.service");
let GraphController = class GraphController {
    constructor(graphService) {
        this.graphService = graphService;
    }
    async getGraphById(id) {
        return this.graphService.getGraphById(new mongoose_1.Types.ObjectId(id));
    }
    async getParentGraphs(skip, authContext) {
        return this.graphService.getParentGraphs(skip, authContext.userId);
    }
    async getAllChildrenGraphs(parentGraphId, skip, authContext) {
        return this.graphService.getAllChildrenGraphs(new mongoose_1.Types.ObjectId(parentGraphId), skip, authContext.userId);
    }
    async getAllChildrenByGlobal(globalGraphId) {
        return this.graphService.getAllChildrenByGlobal(new mongoose_1.Types.ObjectId(globalGraphId));
    }
    async getAllChildrenByTopic(parentGraphId) {
        return this.graphService.getAllChildrenByTopic(new mongoose_1.Types.ObjectId(parentGraphId));
    }
    async getTopicGraphs(parentGraphId) {
        return this.graphService.getTopicGraphs(new mongoose_1.Types.ObjectId(parentGraphId));
    }
    async getTopicGraphsWithMain(globalGraphId) {
        return this.graphService.getTopicGraphsWithMain(new mongoose_1.Types.ObjectId(globalGraphId));
    }
    async getGlobalGraphs() {
        return this.graphService.getGlobalGraphs();
    }
};
exports.GraphController = GraphController;
__decorate([
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getGraphById", null);
__decorate([
    (0, common_1.Get)('getParentGraphs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, optionalAuth_guard_1.OptionalAuthGuard),
    (0, optionalAuth_decorator_1.OptionalAuth)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, optional_auth_context_decorator_1.GetOptionalAuthContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getParentGraphs", null);
__decorate([
    (0, common_1.Get)('getAllChildrenGraphs/:parentGraphId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, optionalAuth_guard_1.OptionalAuthGuard),
    (0, optionalAuth_decorator_1.OptionalAuth)(),
    __param(0, (0, common_1.Param)('parentGraphId')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, optional_auth_context_decorator_1.GetOptionalAuthContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getAllChildrenGraphs", null);
__decorate([
    (0, common_1.Get)('getAllChildrenByGlobal/:globalGraphId'),
    __param(0, (0, common_1.Param)('globalGraphId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getAllChildrenByGlobal", null);
__decorate([
    (0, common_1.Get)('getAllChildrenByTopic/:parentGraphId'),
    __param(0, (0, common_1.Param)('parentGraphId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getAllChildrenByTopic", null);
__decorate([
    (0, common_1.Get)('getTopicGraphs/:parentGraphId'),
    __param(0, (0, common_1.Param)('parentGraphId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getTopicGraphs", null);
__decorate([
    (0, common_1.Get)('getTopicGraphsWithGlobal/:globalGraphId'),
    __param(0, (0, common_1.Param)('globalGraphId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getTopicGraphsWithMain", null);
__decorate([
    (0, common_1.Get)('getGlobalGraphs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GraphController.prototype, "getGlobalGraphs", null);
exports.GraphController = GraphController = __decorate([
    (0, common_1.Controller)('graph'),
    __metadata("design:paramtypes", [graph_service_1.GraphService])
], GraphController);
//# sourceMappingURL=graph.controller.js.map
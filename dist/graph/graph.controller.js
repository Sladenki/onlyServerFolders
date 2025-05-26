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
    async getAllChildrenGraphs(parentGraphId) {
        return this.graphService.getAllChildrenGraphs(new mongoose_1.Types.ObjectId(parentGraphId));
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
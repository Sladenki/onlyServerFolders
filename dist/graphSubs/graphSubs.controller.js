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
exports.GraphSubsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const auth_decorator_1 = require("../decorators/auth.decorator");
const currentUser_decorator_1 = require("../decorators/currentUser.decorator");
const graphSubs_service_1 = require("./graphSubs.service");
let GraphSubsController = class GraphSubsController {
    constructor(graphSubsService) {
        this.graphSubsService = graphSubsService;
    }
    async toggleSub(currentUserId, body) {
        const { graphId } = body;
        const graphIdObjectId = new mongoose_1.Types.ObjectId(graphId);
        return this.graphSubsService.toggleSub(currentUserId, graphIdObjectId);
    }
    async getSubsPosts(skip, userId) {
        return this.graphSubsService.getSubsPosts(skip, userId);
    }
    async getSubsSchedule(userId) {
        return this.graphSubsService.getSubsSchedule(userId);
    }
};
exports.GraphSubsController = GraphSubsController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], GraphSubsController.prototype, "toggleSub", null);
__decorate([
    (0, common_1.Get)('getSubsPosts'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], GraphSubsController.prototype, "getSubsPosts", null);
__decorate([
    (0, common_1.Get)('getSubsSchedule'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], GraphSubsController.prototype, "getSubsSchedule", null);
exports.GraphSubsController = GraphSubsController = __decorate([
    (0, common_1.Controller)('graphSubs'),
    __metadata("design:paramtypes", [graphSubs_service_1.GraphSubsService])
], GraphSubsController);
//# sourceMappingURL=graphSubs.controller.js.map
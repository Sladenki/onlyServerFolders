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
exports.UserPostReactionController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../decorators/auth.decorator");
const userPostReaction_service_1 = require("./userPostReaction.service");
const currentUser_decorator_1 = require("../decorators/currentUser.decorator");
const mongoose_1 = require("mongoose");
let UserPostReactionController = class UserPostReactionController {
    constructor(userPostReactionPostService) {
        this.userPostReactionPostService = userPostReactionPostService;
    }
    async createUserAndReactionConnection(userId, dto) {
        console.log('dto', dto, userId);
        return this.userPostReactionPostService.createUserAndReactionConnection(userId, dto.reactionId, dto.postId, dto.isReacted);
    }
    async checkUserReaction(dto) {
        return this.userPostReactionPostService.isUserReactionExists(dto.reactionId, dto.userId);
    }
};
exports.UserPostReactionController = UserPostReactionController;
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
], UserPostReactionController.prototype, "createUserAndReactionConnection", null);
__decorate([
    (0, common_1.Get)('checkUserReaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPostReactionController.prototype, "checkUserReaction", null);
exports.UserPostReactionController = UserPostReactionController = __decorate([
    (0, common_1.Controller)('userPostReactionPost'),
    __metadata("design:paramtypes", [userPostReaction_service_1.UserPostReactionService])
], UserPostReactionController);
//# sourceMappingURL=userPostReaction.controller.js.map
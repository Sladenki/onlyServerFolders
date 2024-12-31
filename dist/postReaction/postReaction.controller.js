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
exports.PostReactionController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../decorators/auth.decorator");
const mongoose_1 = require("mongoose");
const postReaction_service_1 = require("./postReaction.service");
const createPostReaction_dto_1 = require("./dto/createPostReaction.dto");
let PostReactionController = class PostReactionController {
    constructor(postReactionService) {
        this.postReactionService = postReactionService;
    }
    async createPost(dto) {
        return this.postReactionService.createPostReaction(dto);
    }
    async getReactionsByPostId(postId) {
        return this.postReactionService.findReactionsByPostId(new mongoose_1.Types.ObjectId(postId));
    }
    async incrementClickNum(postId) {
        return this.postReactionService.incrementClickNum(new mongoose_1.Types.ObjectId(postId));
    }
};
exports.PostReactionController = PostReactionController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPostReaction_dto_1.CreatePostReactionDto]),
    __metadata("design:returntype", Promise)
], PostReactionController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostReactionController.prototype, "getReactionsByPostId", null);
__decorate([
    (0, common_1.Post)(':postId/increment'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostReactionController.prototype, "incrementClickNum", null);
exports.PostReactionController = PostReactionController = __decorate([
    (0, common_1.Controller)('postReaction'),
    __metadata("design:paramtypes", [postReaction_service_1.PostReactionService])
], PostReactionController);
//# sourceMappingURL=postReaction.controller.js.map
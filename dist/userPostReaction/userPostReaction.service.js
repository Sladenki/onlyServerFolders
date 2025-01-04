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
exports.UserPostReactionService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const mongoose_1 = require("mongoose");
const userPostReaction_model_1 = require("./userPostReaction.model");
const postReaction_service_1 = require("../postReaction/postReaction.service");
let UserPostReactionService = class UserPostReactionService {
    constructor(userPostReactionModel, postReactionService) {
        this.userPostReactionModel = userPostReactionModel;
        this.postReactionService = postReactionService;
    }
    async createUserAndReactionConnection(userId, postReaction, postId, isReacted) {
        if (!isReacted) {
            await this.postReactionService.incrementClickNum(new mongoose_1.Types.ObjectId(postId));
            return await this.userPostReactionModel.create({
                user: userId,
                postReaction,
            });
        }
        else {
            await this.postReactionService.decrementClickNum(new mongoose_1.Types.ObjectId(postId));
            const result = await this.userPostReactionModel.findOneAndDelete({
                user: userId,
                postReaction,
            });
            if (!result) {
                throw new Error(`User reaction with userId ${userId} and postId ${postId} not found`);
            }
            return result;
        }
    }
    async isUserReactionExists(reactionId, userId) {
        console.log('isUserReactionExists', reactionId, userId);
        const reaction = await this.userPostReactionModel.findOne({
            postReaction: new mongoose_1.Types.ObjectId(reactionId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        return !!reaction;
    }
};
exports.UserPostReactionService = UserPostReactionService;
exports.UserPostReactionService = UserPostReactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(userPostReaction_model_1.UserPostReactionModel)),
    __metadata("design:paramtypes", [Object, postReaction_service_1.PostReactionService])
], UserPostReactionService);
//# sourceMappingURL=userPostReaction.service.js.map
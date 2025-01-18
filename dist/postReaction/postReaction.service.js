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
exports.PostReactionService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const postReaction_model_1 = require("./postReaction.model");
let PostReactionService = class PostReactionService {
    constructor(postReactionModel) {
        this.postReactionModel = postReactionModel;
    }
    async createPostReaction(dto) {
        return await this.postReactionModel.create(dto);
    }
    async incrementClickNum(postId) {
        const reaction = await this.postReactionModel.findOneAndUpdate({ post: postId }, { $inc: { clickNum: 1 } }, { new: true });
        if (!reaction) {
            throw new Error(`Reaction with postId ${postId} not found`);
        }
        return reaction;
    }
    async decrementClickNum(postId) {
        const reaction = await this.postReactionModel.findOneAndUpdate({ post: postId }, { $inc: { clickNum: -1 } }, { new: true });
        if (!reaction) {
            throw new Error(`Reaction with postId ${postId} not found`);
        }
        return reaction;
    }
};
exports.PostReactionService = PostReactionService;
exports.PostReactionService = PostReactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(postReaction_model_1.PostReactionModel)),
    __metadata("design:paramtypes", [Object])
], PostReactionService);
//# sourceMappingURL=postReaction.service.js.map
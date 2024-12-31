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
exports.TaggedPostService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const taggedPost_model_1 = require("./taggedPost.model");
let TaggedPostService = class TaggedPostService {
    constructor(taggedPostModel) {
        this.taggedPostModel = taggedPostModel;
    }
    async createTaggedPost(postId, postTagId) {
        return await this.taggedPostModel.create({ postId, postTagId });
    }
};
exports.TaggedPostService = TaggedPostService;
exports.TaggedPostService = TaggedPostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(taggedPost_model_1.TaggedPostModel)),
    __metadata("design:paramtypes", [Object])
], TaggedPostService);
//# sourceMappingURL=taggedPost.service.js.map
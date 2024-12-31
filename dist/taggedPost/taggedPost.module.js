"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaggedPostModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const post_model_1 = require("../post/post.model");
const postTag_model_1 = require("../postTag/postTag.model");
const taggedPost_controller_1 = require("./taggedPost.controller");
const taggedPost_service_1 = require("./taggedPost.service");
const taggedPost_model_1 = require("./taggedPost.model");
let TaggedPostModule = class TaggedPostModule {
};
exports.TaggedPostModule = TaggedPostModule;
exports.TaggedPostModule = TaggedPostModule = __decorate([
    (0, common_1.Module)({
        controllers: [taggedPost_controller_1.TaggedPostController],
        providers: [taggedPost_service_1.TaggedPostService],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: taggedPost_model_1.TaggedPostModel,
                    schemaOptions: { collection: 'TaggedPost' },
                },
                {
                    typegooseClass: post_model_1.PostModel,
                    schemaOptions: { collection: 'Post' },
                },
                {
                    typegooseClass: postTag_model_1.PostTagModel,
                    schemaOptions: { collection: 'PostTag' },
                },
            ]),
        ],
        exports: [taggedPost_service_1.TaggedPostService],
    })
], TaggedPostModule);
//# sourceMappingURL=taggedPost.module.js.map
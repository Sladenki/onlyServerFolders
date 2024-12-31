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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaggedPostModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const post_model_1 = require("../post/post.model");
const postTag_model_1 = require("../postTag/postTag.model");
let TaggedPostModel = class TaggedPostModel extends defaultClasses_1.TimeStamps {
};
exports.TaggedPostModel = TaggedPostModel;
__decorate([
    (0, typegoose_1.prop)({ index: true, ref: () => post_model_1.PostModel }),
    __metadata("design:type", Object)
], TaggedPostModel.prototype, "postId", void 0);
__decorate([
    (0, typegoose_1.prop)({ index: true, ref: () => postTag_model_1.PostTagModel }),
    __metadata("design:type", Object)
], TaggedPostModel.prototype, "postTagId", void 0);
exports.TaggedPostModel = TaggedPostModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: false,
            versionKey: false
        }
    })
], TaggedPostModel);
//# sourceMappingURL=taggedPost.model.js.map
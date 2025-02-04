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
exports.PostModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const mongoose_1 = require("mongoose");
const graph_model_1 = require("../graph/graph.model");
const postReaction_model_1 = require("../postReaction/postReaction.model");
const user_model_1 = require("../user/user.model");
let PostModel = class PostModel extends defaultClasses_1.TimeStamps {
};
exports.PostModel = PostModel;
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.UserModel, index: true }),
    __metadata("design:type", Object)
], PostModel.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => graph_model_1.GraphModel, index: true }),
    __metadata("design:type", Object)
], PostModel.prototype, "graphId", void 0);
__decorate([
    (0, typegoose_1.prop)({ index: true, maxlength: 500 }),
    __metadata("design:type", String)
], PostModel.prototype, "content", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], PostModel.prototype, "imgPath", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: [mongoose_1.Types.ObjectId], ref: () => postReaction_model_1.PostReactionModel }),
    __metadata("design:type", Array)
], PostModel.prototype, "reactions", void 0);
exports.PostModel = PostModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            versionKey: false
        }
    })
], PostModel);
//# sourceMappingURL=post.model.js.map
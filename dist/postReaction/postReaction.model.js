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
exports.PostReactionModel = exports.Emoji = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const post_model_1 = require("../post/post.model");
var Emoji;
(function (Emoji) {
    Emoji["LIKE"] = "\uD83D\uDC4D";
    Emoji["LOVE"] = "\u2764\uFE0F";
    Emoji["SHARP"] = "\uD83D\uDE0E";
    Emoji["WOW"] = "\uD83D\uDE2E";
    Emoji["SMILE"] = "\uD83D\uDE01";
    Emoji["EXOLIDING_HEAD"] = "\uD83E\uDD2F";
})(Emoji || (exports.Emoji = Emoji = {}));
let PostReactionModel = class PostReactionModel extends defaultClasses_1.TimeStamps {
};
exports.PostReactionModel = PostReactionModel;
__decorate([
    (0, typegoose_1.prop)({ maxlength: 10 }),
    __metadata("design:type", String)
], PostReactionModel.prototype, "text", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: Emoji }),
    __metadata("design:type", String)
], PostReactionModel.prototype, "emoji", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], PostReactionModel.prototype, "clickNum", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => post_model_1.PostModel, index: true }),
    __metadata("design:type", Object)
], PostReactionModel.prototype, "post", void 0);
exports.PostReactionModel = PostReactionModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: false,
            versionKey: false
        }
    })
], PostReactionModel);
//# sourceMappingURL=postReaction.model.js.map
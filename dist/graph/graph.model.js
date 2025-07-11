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
exports.GraphModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const user_model_1 = require("../user/user.model");
let GraphModel = class GraphModel extends defaultClasses_1.TimeStamps {
};
exports.GraphModel = GraphModel;
__decorate([
    (0, typegoose_1.prop)({ enum: ["global", "topic", "default"], required: true, index: true }),
    __metadata("design:type", String)
], GraphModel.prototype, "graphType", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => GraphModel, index: true }),
    __metadata("design:type", Object)
], GraphModel.prototype, "globalGraphId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GraphModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GraphModel.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ index: true, maxlength: 200 }),
    __metadata("design:type", String)
], GraphModel.prototype, "about", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.UserModel, index: true }),
    __metadata("design:type", Object)
], GraphModel.prototype, "ownerUserId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], GraphModel.prototype, "subsNum", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => GraphModel, index: true }),
    __metadata("design:type", Object)
], GraphModel.prototype, "parentGraphId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0, index: true }),
    __metadata("design:type", Number)
], GraphModel.prototype, "childGraphNum", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GraphModel.prototype, "imgPath", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GraphModel.prototype, "directorName", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GraphModel.prototype, "directorVkLink", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GraphModel.prototype, "vkLink", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GraphModel.prototype, "websiteLink", void 0);
exports.GraphModel = GraphModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: false,
            versionKey: false
        }
    })
], GraphModel);
//# sourceMappingURL=graph.model.js.map
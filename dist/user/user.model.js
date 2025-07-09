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
exports.UserModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const graph_model_1 = require("../graph/graph.model");
let UserModel = class UserModel extends defaultClasses_1.TimeStamps {
};
exports.UserModel = UserModel;
__decorate([
    (0, typegoose_1.prop)({ enum: ['create', 'admin', 'editor', 'sysadmin', 'user'], default: 'user' }),
    __metadata("design:type", String)
], UserModel.prototype, "role", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => graph_model_1.GraphModel, index: true, default: null }),
    __metadata("design:type", Object)
], UserModel.prototype, "selectedGraphId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], UserModel.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], UserModel.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], UserModel.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], UserModel.prototype, "avaPath", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], UserModel.prototype, "telegramId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserModel.prototype, "graphSubsNum", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserModel.prototype, "postsNum", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], UserModel.prototype, "attentedEventsNum", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "copyrightAgreementAccepted", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], UserModel.prototype, "copyrightAgreementAcceptedAt", void 0);
exports.UserModel = UserModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            versionKey: false,
            timestamps: { createdAt: true, updatedAt: false },
        },
    })
], UserModel);
//# sourceMappingURL=user.model.js.map
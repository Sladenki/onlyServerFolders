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
exports.GraphSubsModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const graph_model_1 = require("../graph/graph.model");
const user_model_1 = require("../user/user.model");
let GraphSubsModel = class GraphSubsModel extends defaultClasses_1.TimeStamps {
};
exports.GraphSubsModel = GraphSubsModel;
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.UserModel, index: true }),
    __metadata("design:type", Object)
], GraphSubsModel.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => graph_model_1.GraphModel, index: true }),
    __metadata("design:type", Object)
], GraphSubsModel.prototype, "graph", void 0);
exports.GraphSubsModel = GraphSubsModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: false,
            versionKey: false,
        }
    }),
    (0, typegoose_1.index)({ user: 1, graph: 1 })
], GraphSubsModel);
//# sourceMappingURL=graphSubs.model.js.map
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
exports.ScheduleModel = exports.ScheduleType = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const graph_model_1 = require("../graph/graph.model");
var ScheduleType;
(function (ScheduleType) {
    ScheduleType["LECTURE"] = "lecture";
    ScheduleType["PRACTICE"] = "practice";
})(ScheduleType || (exports.ScheduleType = ScheduleType = {}));
let ScheduleModel = class ScheduleModel extends defaultClasses_1.TimeStamps {
};
exports.ScheduleModel = ScheduleModel;
__decorate([
    (0, typegoose_1.prop)({ ref: () => graph_model_1.GraphModel, index: true }),
    __metadata("design:type", Object)
], ScheduleModel.prototype, "graphId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], ScheduleModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: ScheduleType }),
    __metadata("design:type", String)
], ScheduleModel.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], ScheduleModel.prototype, "roomNumber", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, min: 0, max: 6 }),
    __metadata("design:type", Number)
], ScheduleModel.prototype, "dayOfWeek", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], ScheduleModel.prototype, "timeFrom", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", String)
], ScheduleModel.prototype, "timeTo", void 0);
exports.ScheduleModel = ScheduleModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: false,
            versionKey: false
        }
    })
], ScheduleModel);
//# sourceMappingURL=schedule.model.js.map
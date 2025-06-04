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
exports.EventModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const graph_model_1 = require("../graph/graph.model");
let EventModel = class EventModel extends defaultClasses_1.TimeStamps {
};
exports.EventModel = EventModel;
__decorate([
    (0, typegoose_1.prop)({ ref: () => graph_model_1.GraphModel, required: true, index: true }),
    __metadata("design:type", Object)
], EventModel.prototype, "graphId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => graph_model_1.GraphModel, required: true, index: true }),
    __metadata("design:type", Object)
], EventModel.prototype, "globalGraphId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], EventModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ maxlength: 150 }),
    __metadata("design:type", String)
], EventModel.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], EventModel.prototype, "eventDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], EventModel.prototype, "timeFrom", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], EventModel.prototype, "timeTo", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], EventModel.prototype, "regedUsers", void 0);
exports.EventModel = EventModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: false,
            versionKey: false
        }
    })
], EventModel);
//# sourceMappingURL=event.model.js.map
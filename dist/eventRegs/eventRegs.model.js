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
exports.EventRegsModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const event_model_1 = require("../event/event.model");
const user_model_1 = require("../user/user.model");
let EventRegsModel = class EventRegsModel extends defaultClasses_1.TimeStamps {
};
exports.EventRegsModel = EventRegsModel;
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.UserModel, index: true }),
    __metadata("design:type", Object)
], EventRegsModel.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => event_model_1.EventModel, index: true }),
    __metadata("design:type", Object)
], EventRegsModel.prototype, "eventId", void 0);
exports.EventRegsModel = EventRegsModel = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: false,
            versionKey: false
        }
    })
], EventRegsModel);
//# sourceMappingURL=eventRegs.model.js.map
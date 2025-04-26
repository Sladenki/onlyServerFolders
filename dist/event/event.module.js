"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const event_controller_1 = require("./event.controller");
const event_service_1 = require("./event.service");
const event_model_1 = require("./event.model");
const eventRegs_module_1 = require("../eventRegs/eventRegs.module");
let EventModule = class EventModule {
};
exports.EventModule = EventModule;
exports.EventModule = EventModule = __decorate([
    (0, common_1.Module)({
        controllers: [event_controller_1.EventController],
        providers: [event_service_1.EventService],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: event_model_1.EventModel,
                    schemaOptions: { collection: 'Event' }
                },
            ]),
            eventRegs_module_1.EventRegsModule,
        ],
        exports: [event_service_1.EventService]
    })
], EventModule);
//# sourceMappingURL=event.module.js.map
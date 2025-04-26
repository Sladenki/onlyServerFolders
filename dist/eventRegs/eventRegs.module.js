"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegsModule = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../user/user.model");
const eventRegs_controller_1 = require("./eventRegs.controller");
const eventRegs_service_1 = require("./eventRegs.service");
const eventRegs_model_1 = require("./eventRegs.model");
const event_model_1 = require("../event/event.model");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
let EventRegsModule = class EventRegsModule {
};
exports.EventRegsModule = EventRegsModule;
exports.EventRegsModule = EventRegsModule = __decorate([
    (0, common_1.Module)({
        controllers: [eventRegs_controller_1.EventRegsController],
        providers: [eventRegs_service_1.EventRegsService],
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: eventRegs_model_1.EventRegsModel,
                    schemaOptions: { collection: 'EventRegs' }
                },
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: { collection: 'User' }
                },
                {
                    typegooseClass: event_model_1.EventModel,
                    schemaOptions: { collection: 'Event' }
                },
            ]),
        ],
        exports: [eventRegs_service_1.EventRegsService]
    })
], EventRegsModule);
//# sourceMappingURL=eventRegs.module.js.map
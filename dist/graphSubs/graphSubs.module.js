"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphSubsModule = void 0;
const common_1 = require("@nestjs/common");
const graphSubs_controller_1 = require("./graphSubs.controller");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const graphSubs_model_1 = require("./graphSubs.model");
const graphSubs_service_1 = require("./graphSubs.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("../config/jwt.config");
const schedule_module_1 = require("../schedule/schedule.module");
const graph_model_1 = require("../graph/graph.model");
const event_module_1 = require("../event/event.module");
let GraphSubsModule = class GraphSubsModule {
};
exports.GraphSubsModule = GraphSubsModule;
exports.GraphSubsModule = GraphSubsModule = __decorate([
    (0, common_1.Module)({
        controllers: [graphSubs_controller_1.GraphSubsController],
        providers: [graphSubs_service_1.GraphSubsService],
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: graphSubs_model_1.GraphSubsModel,
                    schemaOptions: { collection: 'GraphSubs' }
                },
                {
                    typegooseClass: graph_model_1.GraphModel,
                    schemaOptions: { collection: 'Graph' }
                },
            ]),
            schedule_module_1.ScheduleModule,
            event_module_1.EventModule
        ],
        exports: [graphSubs_service_1.GraphSubsService]
    })
], GraphSubsModule);
//# sourceMappingURL=graphSubs.module.js.map
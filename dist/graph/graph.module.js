"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const graph_controller_1 = require("./graph.controller");
const graph_model_1 = require("./graph.model");
const graph_service_1 = require("./graph.service");
const jwt_strategy_1 = require("../user/jwt.strategy");
const config_1 = require("@nestjs/config");
const user_model_1 = require("../user/user.model");
const graphSubs_module_1 = require("../graphSubs/graphSubs.module");
const optionalAuth_guard_1 = require("../guards/optionalAuth.guard");
let GraphModule = class GraphModule {
};
exports.GraphModule = GraphModule;
exports.GraphModule = GraphModule = __decorate([
    (0, common_1.Module)({
        controllers: [graph_controller_1.GraphController],
        providers: [jwt_strategy_1.JwtStrategy, graph_service_1.GraphService, optionalAuth_guard_1.OptionalAuthGuard],
        imports: [
            config_1.ConfigModule,
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: graph_model_1.GraphModel,
                    schemaOptions: { collection: 'Graph' },
                },
            ]),
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: { collection: 'User' },
                },
            ]),
            (0, common_1.forwardRef)(() => graphSubs_module_1.GraphSubsModule)
        ],
        exports: [graph_service_1.GraphService],
    })
], GraphModule);
//# sourceMappingURL=graph.module.js.map
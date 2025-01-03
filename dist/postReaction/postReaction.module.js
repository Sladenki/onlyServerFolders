"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostReactionModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const user_model_1 = require("../user/user.model");
const post_model_1 = require("../post/post.model");
const postReaction_controller_1 = require("./postReaction.controller");
const postReaction_service_1 = require("./postReaction.service");
const postReaction_model_1 = require("./postReaction.model");
const jwt_strategy_1 = require("../user/jwt.strategy");
const google_strategy_1 = require("../strategies/google.strategy");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
let PostReactionModule = class PostReactionModule {
};
exports.PostReactionModule = PostReactionModule;
exports.PostReactionModule = PostReactionModule = __decorate([
    (0, common_1.Module)({
        controllers: [postReaction_controller_1.PostReactionController],
        providers: [jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy, postReaction_service_1.PostReactionService],
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: postReaction_model_1.PostReactionModel,
                    schemaOptions: { collection: 'PostReaction' },
                },
                {
                    typegooseClass: post_model_1.PostModel,
                    schemaOptions: { collection: 'Post' },
                },
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: { collection: 'User' },
                },
            ]),
        ],
        exports: [postReaction_service_1.PostReactionService],
    })
], PostReactionModule);
//# sourceMappingURL=postReaction.module.js.map
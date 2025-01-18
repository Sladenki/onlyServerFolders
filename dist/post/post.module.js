"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const post_model_1 = require("./post.model");
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const user_model_1 = require("../user/user.model");
const graph_module_1 = require("../graph/graph.module");
const s3_module_1 = require("../s3/s3.module");
const postReaction_module_1 = require("../postReaction/postReaction.module");
const userPostReaction_module_1 = require("../userPostReaction/userPostReaction.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("../config/jwt.config");
const graphSubs_module_1 = require("../graphSubs/graphSubs.module");
const userPostReaction_model_1 = require("../userPostReaction/userPostReaction.model");
const graphSubs_model_1 = require("../graphSubs/graphSubs.model");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: post_model_1.PostModel,
                    schemaOptions: { collection: 'Post' },
                },
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: { collection: 'User' },
                },
                {
                    typegooseClass: userPostReaction_model_1.UserPostReactionModel,
                    schemaOptions: { collection: 'UserPostReaction' },
                },
                {
                    typegooseClass: graphSubs_model_1.GraphSubsModel,
                    schemaOptions: { collection: 'GraphSubs' }
                },
            ]),
            graph_module_1.GraphModule,
            s3_module_1.S3Module,
            postReaction_module_1.PostReactionModule,
            userPostReaction_module_1.UserPostReactionModule,
            (0, common_1.forwardRef)(() => graphSubs_module_1.GraphSubsModule)
        ],
        exports: [post_service_1.PostService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map
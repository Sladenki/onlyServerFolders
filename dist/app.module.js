"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const mongo_config_1 = require("./config/mongo.config");
const user_module_1 = require("./user/user.module");
const post_module_1 = require("./post/post.module");
const logging_middleware_1 = require("./logging.middleware");
const graph_module_1 = require("./graph/graph.module");
const postTag_module_1 = require("./postTag/postTag.module");
const taggedPost_module_1 = require("./taggedPost/taggedPost.module");
const s3_module_1 = require("./s3/s3.module");
const postReaction_module_1 = require("./postReaction/postReaction.module");
const userPostReaction_module_1 = require("./userPostReaction/userPostReaction.module");
const auth_module_1 = require("./auth/auth.module");
const passport_1 = require("@nestjs/passport");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logging_middleware_1.LogginMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            nestjs_typegoose_1.TypegooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: mongo_config_1.getMongoConfig,
            }),
            passport_1.PassportModule.register({ session: false }),
            s3_module_1.S3Module,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            post_module_1.PostModule,
            postTag_module_1.PostTagModule,
            taggedPost_module_1.TaggedPostModule,
            graph_module_1.GraphModule,
            postReaction_module_1.PostReactionModule,
            userPostReaction_module_1.UserPostReactionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostReactionModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const user_model_1 = require("../user/user.model");
const userPostReaction_controller_1 = require("./userPostReaction.controller");
const postReaction_model_1 = require("../postReaction/postReaction.model");
const userPostReaction_service_1 = require("./userPostReaction.service");
const userPostReaction_model_1 = require("./userPostReaction.model");
const postReaction_module_1 = require("../postReaction/postReaction.module");
let UserPostReactionModule = class UserPostReactionModule {
};
exports.UserPostReactionModule = UserPostReactionModule;
exports.UserPostReactionModule = UserPostReactionModule = __decorate([
    (0, common_1.Module)({
        controllers: [userPostReaction_controller_1.UserPostReactionController],
        providers: [userPostReaction_service_1.UserPostReactionService],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: userPostReaction_model_1.UserPostReactionModel,
                    schemaOptions: { collection: 'UserPostReaction' },
                },
                {
                    typegooseClass: postReaction_model_1.PostReactionModel,
                    schemaOptions: { collection: 'PostReaction' },
                },
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: { collection: 'User' },
                },
            ]),
            postReaction_module_1.PostReactionModule,
        ],
        exports: [userPostReaction_service_1.UserPostReactionService],
    })
], UserPostReactionModule);
//# sourceMappingURL=userPostReaction.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubsModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const user_model_1 = require("../user/user.model");
const userSubs_service_1 = require("./userSubs.service");
const userSubs_model_1 = require("./userSubs.model");
const userSubs_controller_1 = require("./userSubs.controller");
let UserSubsModule = class UserSubsModule {
};
exports.UserSubsModule = UserSubsModule;
exports.UserSubsModule = UserSubsModule = __decorate([
    (0, common_1.Module)({
        controllers: [userSubs_controller_1.UserSubsController],
        providers: [userSubs_service_1.UserSubsService],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: userSubs_model_1.userSubsModel,
                    schemaOptions: { collection: 'UserSubs' },
                },
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: { collection: 'User' },
                },
            ]),
        ],
    })
], UserSubsModule);
//# sourceMappingURL=userSubs.module.js.map
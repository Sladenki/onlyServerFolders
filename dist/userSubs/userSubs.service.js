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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const userSubs_model_1 = require("./userSubs.model");
const user_model_1 = require("../user/user.model");
let UserSubsService = class UserSubsService {
    constructor(userSubsModel, UserModel) {
        this.userSubsModel = userSubsModel;
        this.UserModel = UserModel;
    }
    async toggleSubs(fromUser, toUser) {
        if (String(fromUser) === String(toUser))
            return;
        const isUserSubscribed = await this.userSubsModel
            .findOne({ fromUser, toUser })
            .exec();
        if (isUserSubscribed) {
            await Promise.all([
                this.UserModel.findOneAndUpdate({ _id: fromUser }, { $inc: { subsNum: -1 } }).exec(),
                this.UserModel.findOneAndUpdate({ _id: toUser }, { $inc: { followersNum: -1 } }).exec(),
                this.userSubsModel.deleteOne({ fromUser, toUser }),
            ]);
        }
        else {
            await Promise.all([
                this.UserModel.findOneAndUpdate({ _id: fromUser }, { $inc: { subsNum: 1 } }).exec(),
                this.UserModel.findOneAndUpdate({ _id: toUser }, { $inc: { followersNum: 1 } }).exec(),
                this.userSubsModel.create({ fromUser, toUser }),
            ]);
        }
    }
};
exports.UserSubsService = UserSubsService;
exports.UserSubsService = UserSubsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(userSubs_model_1.userSubsModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, Object])
], UserSubsService);
//# sourceMappingURL=userSubs.service.js.map
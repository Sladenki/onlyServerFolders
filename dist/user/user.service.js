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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const user_model_1 = require("./user.model");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(UserModel, jwtService) {
        this.UserModel = UserModel;
        this.jwtService = jwtService;
    }
    async auth(dto) {
        const user = await this.UserModel.findOneAndUpdate({ email: dto.email }, {
            $setOnInsert: {
                email: dto.email,
                name: dto.name,
                avaPath: dto.image,
            },
        }, {
            new: true,
            upsert: true,
        });
        const mainData = user?._doc;
        return {
            ...mainData,
            token: this.jwtService.sign({ _id: mainData._id }),
        };
    }
    async getUserById(_id) {
        const user = await this.UserModel.findById(_id)
            .lean()
            .select({ _id: 0, email: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map
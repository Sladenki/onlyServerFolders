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
const jwt_service_1 = require("../jwt/jwt.service");
const mongoose_1 = require("mongoose");
let UserService = class UserService {
    constructor(UserModel, jwtAuthService) {
        this.UserModel = UserModel;
        this.jwtAuthService = jwtAuthService;
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
            token: this.jwtAuthService.generateToken(mainData._id.toString(), 'user'),
        };
    }
    async getUserById(_id) {
        const user = await this.UserModel.findById(_id)
            .lean()
            .select({ _id: 0, email: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        return user;
    }
    async getAllUsers() {
        const users = await this.UserModel
            .find()
            .sort({ _id: 1 })
            .lean()
            .select({ createdAt: 0, updatedAt: 0 });
        return users;
    }
    async generateToken(userId, role) {
        return this.jwtAuthService.generateToken(new mongoose_1.Types.ObjectId(userId), role);
    }
    async updateSelectedGraph(userId, selectedGraphId) {
        try {
            const updatedUser = await this.UserModel.findByIdAndUpdate(userId, { selectedGraphId }, { new: true }).lean();
            if (!updatedUser) {
                throw new common_1.NotFoundException('Пользователь не найден');
            }
            return updatedUser;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Ошибка при обновлении выбранного графа');
        }
    }
    async findByTelegramId(telegramId) {
        try {
            const user = await this.UserModel.findOne({
                $or: [
                    { telegramId: telegramId },
                    { telegramId: telegramId.toString() }
                ]
            })
                .lean()
                .exec();
            return user;
        }
        catch (error) {
            console.error('Error finding user by Telegram ID:', error);
            return null;
        }
    }
    async acceptCopyrightAgreement(telegramId) {
        try {
            const now = new Date();
            let user = await this.UserModel.findOne({
                $or: [
                    { telegramId: telegramId },
                    { telegramId: telegramId.toString() }
                ]
            }).lean();
            if (user) {
                user = await this.UserModel.findByIdAndUpdate(user._id, {
                    $set: {
                        copyrightAgreementAccepted: true,
                        copyrightAgreementAcceptedAt: now
                    }
                }, { new: true }).lean();
                console.log(`Existing user ${user._id} (telegramId: ${telegramId}) accepted copyright agreement at ${now}`);
            }
            else {
                user = await this.UserModel.create({
                    telegramId: telegramId.toString(),
                    copyrightAgreementAccepted: true,
                    copyrightAgreementAcceptedAt: now,
                    role: 'user'
                });
                console.log(`New user created for telegramId ${telegramId} with copyright agreement accepted at ${now}`);
            }
            return user;
        }
        catch (error) {
            console.error('Error accepting copyright agreement:', error);
            throw new common_1.InternalServerErrorException('Ошибка при сохранении принятия соглашения');
        }
    }
    async hasAcceptedCopyrightAgreement(telegramId) {
        try {
            const user = await this.UserModel.findOne({
                $or: [
                    { telegramId: telegramId },
                    { telegramId: telegramId.toString() }
                ]
            })
                .select('copyrightAgreementAccepted')
                .lean()
                .exec();
            return user?.copyrightAgreementAccepted || false;
        }
        catch (error) {
            console.error('Error checking copyright agreement:', error);
            return false;
        }
    }
    async migrateTelegramIdsToString() {
        try {
            const usersWithNumericTelegramId = await this.UserModel.find({
                telegramId: { $type: 'number' }
            }).lean();
            console.log(`Found ${usersWithNumericTelegramId.length} users with numeric telegramId`);
            for (const user of usersWithNumericTelegramId) {
                await this.UserModel.findByIdAndUpdate(user._id, { telegramId: user.telegramId.toString() });
                console.log(`Migrated user ${user._id}: telegramId ${user.telegramId} -> "${user.telegramId}"`);
            }
            console.log('TelegramId migration completed');
        }
        catch (error) {
            console.error('Error during telegramId migration:', error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, jwt_service_1.JwtAuthService])
], UserService);
//# sourceMappingURL=user.service.js.map
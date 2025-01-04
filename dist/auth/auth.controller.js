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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const user_model_1 = require("../user/user.model");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
let AuthController = class AuthController {
    constructor(jwtService, UserModel, configService) {
        this.jwtService = jwtService;
        this.UserModel = UserModel;
        this.configService = configService;
        const supportsCapacitorString = this.configService.get('SUPPORTS_CAPACITOR');
        this.supportsCapacitor = supportsCapacitorString === 'true';
    }
    googleAuth() { }
    async googleAuthRedirect(req, res) {
        const user = req.user;
        const isCapacitor = this.supportsCapacitor;
        console.log('isCapacitor', isCapacitor);
        try {
            let userId;
            const existingUser = await this.UserModel.findOne({
                email: user.email,
            }).lean();
            if (existingUser) {
                console.log('Пользователь найден в базе данных:', existingUser);
                userId = existingUser._id.toString();
            }
            else {
                console.log('Пользователь не найден, создаем нового');
                const newUser = new this.UserModel(user);
                const savedUser = await newUser.save();
                userId = savedUser._id.toString();
            }
            const payload = { sub: userId };
            const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
            const refreshToken = (0, uuid_1.v4)();
            await this.UserModel.findByIdAndUpdate(userId, { refreshToken });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
            });
            if (isCapacitor) {
                res.redirect(`com.mycompany.myapp://profile?accessToken=${accessToken}`);
                console.log('перенаправил на com.mycompany.myapp://profile?accessToken');
            }
            else {
                res.redirect(`${process.env.CLIENT_URL}/profile?accessToken=${accessToken}`);
                console.log('перенаправил на localhost');
            }
        }
        catch (error) {
            console.error('Ошибка при поиске/создании пользователя:', error);
            res.redirect(`${process.env.CLIENT_URL}/error?message=Ошибка авторизации`);
        }
    }
    async logout(req, res) {
        console.log('logount hit');
        try {
            const user = req['user'];
            if (user && user.sub) {
                await this.UserModel.findByIdAndUpdate(user.sub, {
                    refreshToken: null,
                });
            }
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
            });
            res.status(200).json({ message: 'Выход выполнен успешно' });
        }
        catch (error) {
            console.error('Ошибка при выходе:', error);
            res.status(500).json({ message: 'Ошибка при выходе из системы' });
        }
    }
    async refresh(req, res) {
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const user = await this.UserModel.findOne({ refreshToken });
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const payload = { sub: user._id.toString(), email: user.email };
            const newAccessToken = this.jwtService.sign(payload, {
                expiresIn: '15m',
            });
            res.json({ accessToken: newAccessToken });
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('callback/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object, config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const user_model_1 = require("../user/user.model");
const express_1 = require("express");
const jwt_service_1 = require("../jwt/jwt.service");
let AuthController = class AuthController {
    constructor(jwtAuthService, UserModel) {
        this.jwtAuthService = jwtAuthService;
        this.UserModel = UserModel;
    }
    onModuleInit() {
        console.log('Bot initialized');
    }
    async telegramAuthRedirect(req, res, query) {
        console.log('called TG');
        const { id, first_name, last_name, username, photo_url } = query;
        console.log('Из query', id, first_name, last_name, username, photo_url);
        const userData = {
            telegramId: id,
            firstName: first_name,
            lastName: last_name,
            username: username,
            photoUrl: photo_url,
        };
        const user = await this.findOrCreateUser(userData);
        const accessToken = this.jwtAuthService.generateToken(user._id, user.role);
        console.log('accessToken', accessToken);
        return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Redirecting...</title>
          <script>
              function checkAppAndRedirect() {
                  var appLink = "graphon://auth?callback_url=" + encodeURIComponent("${process.env.CLIENT_URL}/profile?accessToken=${accessToken}");
                  var fallbackUrl = "${process.env.CLIENT_URL}/profile?accessToken=${accessToken}";
                  var start = Date.now();
                  var timeout = setTimeout(function() {
                      if (Date.now() - start < 2000) {
                          window.location.href = fallbackUrl;
                      }
                  }, 1500);
                  window.location.href = appLink;
              }

              window.onload = checkAppAndRedirect;
          </script>
      </head>
      <body>
          <h1>Redirecting...</h1>
      </body>
      </html>
      `);
    }
    async findOrCreateUser(user) {
        return this.UserModel.findOneAndUpdate({ telegramId: user.telegramId }, user, {
            upsert: true,
            new: true,
            lean: true
        });
    }
    async logout(req, res) {
        try {
            res.clearCookie('accessToken');
            res.status(200).json({ message: 'Вы успешно вышли из системы' });
        }
        catch (error) {
            res.status(500).json({ message: 'Ошибка при выходе из системы' });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('telegram/callback'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "telegramAuthRedirect", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [jwt_service_1.JwtAuthService, Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
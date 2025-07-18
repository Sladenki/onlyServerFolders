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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_user_dto_1 = require("./dto/auth-user.dto");
const mongoose_1 = require("mongoose");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const auth_decorator_1 = require("../decorators/auth.decorator");
const currentUser_decorator_1 = require("../decorators/currentUser.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    auth(dto) {
        return this.userService.auth(dto);
    }
    async getUser(id) {
        return this.userService.getUserById(new mongoose_1.Types.ObjectId(id));
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async getMe(req) {
        return req.user;
    }
    async updateSelectedGraph(userId, selectedGraphId) {
        if (!selectedGraphId) {
            throw new common_1.UnauthorizedException('ID графа не указан');
        }
        return this.userService.updateSelectedGraph(userId, selectedGraphId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_dto_1.AuthUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "auth", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('allUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('selected-graph'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __param(1, (0, common_1.Body)('selectedGraphId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateSelectedGraph", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
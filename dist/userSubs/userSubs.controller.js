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
exports.UserSubsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const userSubs_service_1 = require("./userSubs.service");
const auth_decorator_1 = require("../decorators/auth.decorator");
const currentUser_decorator_1 = require("../decorators/currentUser.decorator");
let UserSubsController = class UserSubsController {
    constructor(userSubsService) {
        this.userSubsService = userSubsService;
    }
    async toggleSubs(currentUserId, subToUserId) {
        return this.userSubsService.toggleSubs(currentUserId, subToUserId);
    }
};
exports.UserSubsController = UserSubsController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':subscribed'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __param(1, (0, common_1.Param)('subscribed')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UserSubsController.prototype, "toggleSubs", null);
exports.UserSubsController = UserSubsController = __decorate([
    (0, common_1.Controller)('UserSubs'),
    __metadata("design:paramtypes", [userSubs_service_1.UserSubsService])
], UserSubsController);
//# sourceMappingURL=userSubs.controller.js.map
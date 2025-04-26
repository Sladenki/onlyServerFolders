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
exports.EventRegsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const auth_decorator_1 = require("../decorators/auth.decorator");
const currentUser_decorator_1 = require("../decorators/currentUser.decorator");
const eventRegs_service_1 = require("./eventRegs.service");
let EventRegsController = class EventRegsController {
    constructor(eventRegsService) {
        this.eventRegsService = eventRegsService;
    }
    async toggleEvent(currentUserId, eventId) {
        return this.eventRegsService.toggleEvent(currentUserId, eventId);
    }
    async getEventsByUserId(userId) {
        return this.eventRegsService.getEventsByUserId(userId);
    }
};
exports.EventRegsController = EventRegsController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Patch)(':eventId'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], EventRegsController.prototype, "toggleEvent", null);
__decorate([
    (0, common_1.Get)('getEventsByUserId'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], EventRegsController.prototype, "getEventsByUserId", null);
exports.EventRegsController = EventRegsController = __decorate([
    (0, common_1.Controller)('eventRegs'),
    __metadata("design:paramtypes", [eventRegs_service_1.EventRegsService])
], EventRegsController);
//# sourceMappingURL=eventRegs.controller.js.map
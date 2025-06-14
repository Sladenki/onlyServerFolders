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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const event_dto_1 = require("./dto/event.dto");
const eventRegs_service_1 = require("../eventRegs/eventRegs.service");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const optionalAuth_guard_1 = require("../guards/optionalAuth.guard");
const optional_auth_context_decorator_1 = require("../decorators/optional-auth-context.decorator");
const optionalAuth_decorator_1 = require("../decorators/optionalAuth.decorator");
const auth_decorator_1 = require("../decorators/auth.decorator");
let EventController = class EventController {
    constructor(eventService, eventRegsService) {
        this.eventService = eventService;
        this.eventRegsService = eventRegsService;
    }
    async createEvent(body) {
        return this.eventService.createEvent(body);
    }
    async getEventsByGraphId(graphId) {
        return this.eventService.getEventsByGraphId(graphId);
    }
    async getUpcomingEvents(authContext, globalGraphId) {
        const events = await this.eventService.getUpcomingEvents(globalGraphId);
        if (authContext.isAuthenticated) {
            const eventsWithAttendance = await Promise.all(events.map(async (event) => {
                const isAttended = await this.eventRegsService.isUserAttendingEvent(authContext.userId, event._id);
                return {
                    ...event,
                    isAttended
                };
            }));
            return eventsWithAttendance;
        }
        return events;
    }
    async deleteEvent(eventId) {
        return this.eventService.deleteEvent(eventId);
    }
    async updateEvent(eventId, dto) {
        return this.eventService.updateEvent(eventId, dto);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)("by-graph/:graphId"),
    __param(0, (0, common_1.Param)("graphId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventsByGraphId", null);
__decorate([
    (0, common_1.Get)("upcoming/:selectedGraphId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, optionalAuth_guard_1.OptionalAuthGuard),
    (0, optionalAuth_decorator_1.OptionalAuth)(),
    __param(0, (0, optional_auth_context_decorator_1.GetOptionalAuthContext)()),
    __param(1, (0, common_1.Param)("selectedGraphId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getUpcomingEvents", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":eventId"),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(":eventId"),
    __param(0, (0, common_1.Param)("eventId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)("event"),
    __metadata("design:paramtypes", [event_service_1.EventService,
        eventRegs_service_1.EventRegsService])
], EventController);
//# sourceMappingURL=event.controller.js.map
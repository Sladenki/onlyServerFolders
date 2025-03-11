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
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const schedule_service_1 = require("./schedule.service");
const create_schedule_dto_1 = require("./dto/create-schedule.dto");
const event_service_1 = require("../event/event.service");
let ScheduleController = class ScheduleController {
    constructor(scheduleService, eventService) {
        this.scheduleService = scheduleService;
        this.eventService = eventService;
    }
    async createSchedule(body) {
        return this.scheduleService.createSchedule(body);
    }
    async getFullScheduleByGraphId(body) {
        const { graphId } = body;
        const schedule = await this.scheduleService.getWeekdaySchedulesByGraph(graphId);
        const events = await this.eventService.getEventsByGraphId(graphId);
        return { schedule, events };
    }
    async getWeekdaySchedulesByGraphs(body) {
        const { graphIds } = body;
        return this.scheduleService.getWeekdaySchedulesByGraphs(graphIds);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Post)("full-by-graph"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getFullScheduleByGraphId", null);
__decorate([
    (0, common_1.Get)('weekday-all'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getWeekdaySchedulesByGraphs", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, common_1.Controller)('schedule'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService,
        event_service_1.EventService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map
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
exports.ScheduleService = void 0;
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const common_1 = require("@nestjs/common");
const schedule_model_1 = require("./schedule.model");
let ScheduleService = class ScheduleService {
    constructor(ScheduleModel) {
        this.ScheduleModel = ScheduleModel;
    }
    async createSchedule(scheduleDto) {
        const newSchedule = new this.ScheduleModel(scheduleDto);
        return newSchedule.save();
    }
    async getWeekdaySchedulesByGraph(graphId) {
        return this.ScheduleModel
            .find({ graphId: graphId })
            .populate('graphId', 'name')
            .lean()
            .exec();
    }
    async getWeekdaySchedulesByGraphs(graphIds) {
        return this.ScheduleModel
            .find({
            graphId: { $in: graphIds },
            dayOfWeek: { $gte: 0, $lte: 4 },
        })
            .populate('graphId', 'name')
            .exec();
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(schedule_model_1.ScheduleModel)),
    __metadata("design:paramtypes", [Object])
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map
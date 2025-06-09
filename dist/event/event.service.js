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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const event_model_1 = require("./event.model");
const mongoose_1 = require("mongoose");
let EventService = class EventService {
    constructor(EventModel) {
        this.EventModel = EventModel;
    }
    async createEvent(dto) {
        return this.EventModel.create({
            ...dto,
            eventDate: new Date(dto.eventDate)
        });
    }
    async getEventsByGraphId(graphId) {
        const now = new Date();
        return this.EventModel
            .find({
            graphId,
            eventDate: { $gte: now }
        })
            .populate("graphId", "name")
            .lean();
    }
    async getEventsByGraphsIds(graphIds) {
        return this.EventModel
            .find({
            graphId: { $in: graphIds },
        })
            .populate("graphId", "name")
            .lean();
    }
    async getUpcomingEvents(globalGraphId) {
        const today = new Date();
        return this.EventModel
            .find({
            eventDate: { $gte: today },
            globalGraphId: new mongoose_1.Types.ObjectId(globalGraphId)
        })
            .sort({ eventDate: 1 })
            .populate("graphId", "name")
            .lean();
    }
    async deleteEvent(eventId) {
        return this.EventModel.findByIdAndDelete(eventId).lean();
    }
    async updateEvent(eventId, dto) {
        return this.EventModel
            .findByIdAndUpdate(eventId, {
            ...dto,
            eventDate: new Date(dto.eventDate)
        }, { new: true })
            .populate("graphId", "name")
            .lean();
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(event_model_1.EventModel)),
    __metadata("design:paramtypes", [Object])
], EventService);
//# sourceMappingURL=event.service.js.map
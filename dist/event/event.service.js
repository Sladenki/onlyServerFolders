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
        try {
            return await this.EventModel.create({
                ...dto,
                eventDate: new Date(dto.eventDate)
            });
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map((err) => {
                    if (err.kind === 'maxlength') {
                        return `Поле "${err.path}" не может быть длиннее ${err.properties.maxlength} символов`;
                    }
                    if (err.kind === 'required') {
                        return `Поле "${err.path}" обязательно для заполнения`;
                    }
                    return `Ошибка в поле "${err.path}": ${err.message}`;
                });
                throw new common_1.HttpException({
                    message: 'Ошибка валидации данных',
                    errors: errors
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Произошла ошибка при создании мероприятия', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getEventsByGraphId(graphId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.EventModel
            .find({
            graphId,
            eventDate: { $gte: today }
        })
            .populate("graphId", "name")
            .lean();
    }
    async getEventsByGraphsIds(graphIds) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.EventModel
            .find({
            graphId: { $in: graphIds },
            eventDate: { $gte: today }
        })
            .populate("graphId", "name")
            .lean();
    }
    async getUpcomingEvents(globalGraphId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.EventModel
            .find({
            eventDate: { $gte: today },
            globalGraphId: new mongoose_1.Types.ObjectId(globalGraphId)
        })
            .sort({ eventDate: 1 })
            .populate("graphId", "name imgPath")
            .lean();
    }
    async deleteEvent(eventId) {
        return this.EventModel.findByIdAndDelete(eventId).lean();
    }
    async updateEvent(eventId, dto) {
        try {
            const updatedEvent = await this.EventModel
                .findByIdAndUpdate(eventId, {
                ...dto,
                eventDate: new Date(dto.eventDate)
            }, { new: true, runValidators: true })
                .populate("graphId", "name")
                .lean();
            if (!updatedEvent) {
                throw new common_1.HttpException('Мероприятие не найдено', common_1.HttpStatus.NOT_FOUND);
            }
            return updatedEvent;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map((err) => {
                    if (err.kind === 'maxlength') {
                        return `Поле "${err.path}" не может быть длиннее ${err.properties.maxlength} символов`;
                    }
                    if (err.kind === 'required') {
                        return `Поле "${err.path}" обязательно для заполнения`;
                    }
                    return `Ошибка в поле "${err.path}": ${err.message}`;
                });
                throw new common_1.HttpException({
                    message: 'Ошибка валидации данных',
                    errors: errors
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Произошла ошибка при обновлении мероприятия', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(event_model_1.EventModel)),
    __metadata("design:paramtypes", [Object])
], EventService);
//# sourceMappingURL=event.service.js.map
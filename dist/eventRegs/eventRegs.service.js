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
exports.EventRegsService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../user/user.model");
const event_model_1 = require("../event/event.model");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const eventRegs_model_1 = require("./eventRegs.model");
let EventRegsService = class EventRegsService {
    constructor(UserModel, EventModel, EventRegsModel) {
        this.UserModel = UserModel;
        this.EventModel = EventModel;
        this.EventRegsModel = EventRegsModel;
    }
    async toggleEvent(userId, eventId) {
        const deletedEvent = await this.EventRegsModel.findOneAndDelete({ userId, eventId }).lean();
        if (deletedEvent) {
            await Promise.all([
                this.UserModel.findOneAndUpdate({ _id: userId }, { $inc: { attentedEventsNum: -1 } }),
                this.EventModel.findOneAndUpdate({ _id: eventId }, { $inc: { regedUsers: -1 } })
            ]);
        }
        else {
            await Promise.all([
                this.UserModel.findOneAndUpdate({ _id: userId }, { $inc: { attentedEventsNum: 1 } }),
                this.EventModel.findOneAndUpdate({ _id: eventId }, { $inc: { regedUsers: 1 } }),
                this.EventRegsModel.create({ userId, eventId })
            ]);
        }
    }
    async isUserAttendingEvent(userId, eventId) {
        const eventReg = await this.EventRegsModel.findOne({ userId, eventId }).exec();
        return !!eventReg;
    }
    async getEventsByUserId(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const regs = await this.EventRegsModel
            .find({ userId })
            .populate({
            path: 'eventId',
            model: 'EventModel',
            populate: {
                path: 'graphId',
                select: 'name imgPath'
            }
        })
            .lean();
        const upcomingEvents = regs
            .filter(reg => reg.eventId && new Date(reg.eventId.eventDate) >= today)
            .map(reg => ({
            ...reg,
            isAttended: true
        }));
        return upcomingEvents;
    }
};
exports.EventRegsService = EventRegsService;
exports.EventRegsService = EventRegsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(event_model_1.EventModel)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(eventRegs_model_1.EventRegsModel)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EventRegsService);
//# sourceMappingURL=eventRegs.service.js.map
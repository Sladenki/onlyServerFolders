/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferrawdoctype" />
/// <reference types="mongoose/types/inferschematype" />
import { ModelType } from "@typegoose/typegoose/lib/types";
import { UserModel } from "src/user/user.model";
import { Types } from "mongoose";
import { EventModel } from "src/event/event.model";
import { EventRegsModel } from "./eventRegs.model";
export declare class EventRegsService {
    private readonly UserModel;
    private readonly EventModel;
    private readonly EventRegsModel;
    constructor(UserModel: ModelType<UserModel>, EventModel: ModelType<EventModel>, EventRegsModel: ModelType<EventRegsModel>);
    toggleEvent(userId: string | Types.ObjectId, eventId: string | Types.ObjectId): Promise<void>;
    isUserAttendingEvent(userId: string | Types.ObjectId, eventId: string | Types.ObjectId): Promise<boolean>;
    getEventsByUserId(userId: string | Types.ObjectId): Promise<{
        isAttended: boolean;
        eventId: EventModel;
    }[]>;
}

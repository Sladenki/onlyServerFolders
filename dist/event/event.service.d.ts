/// <reference types="mongoose/types/document" />
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
import { EventModel } from "./event.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { CreateEventDto } from "./dto/event.dto";
import { Types } from "mongoose";
export declare class EventService {
    private readonly EventModel;
    constructor(EventModel: ModelType<EventModel>);
    createEvent(dto: CreateEventDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, EventModel> & Omit<EventModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getEventsByGraphId(graphId: string): Promise<({
        graphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        globalGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        place: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        regedUsers: number;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getEventsByGraphsIds(graphIds: string[]): Promise<({
        graphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        globalGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        place: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        regedUsers: number;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getUpcomingEvents(globalGraphId: string): Promise<({
        graphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        globalGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        place: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        regedUsers: number;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    deleteEvent(eventId: string | Types.ObjectId): Promise<{
        graphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        globalGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        place: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        regedUsers: number;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateEvent(eventId: string | Types.ObjectId, dto: CreateEventDto): Promise<{
        graphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        globalGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        place: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        regedUsers: number;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}

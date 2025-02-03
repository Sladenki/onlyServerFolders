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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferrawdoctype" />
/// <reference types="mongoose/types/inferschematype" />
import { EventService } from "./event.service";
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    createEvent(body: {
        graphId: string;
        name: string;
        description: string;
        eventDate: string;
        timeFrom: string;
        timeTo: string;
    }): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./event.model").EventModel> & Omit<import("./event.model").EventModel & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getEventsByGraphId(graphId: string): Promise<({
        graphId: import("mongoose").Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        createdAt?: Date;
        updatedAt?: Date;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getUpcomingEvents(): Promise<({
        graphId: import("mongoose").Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        createdAt?: Date;
        updatedAt?: Date;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}

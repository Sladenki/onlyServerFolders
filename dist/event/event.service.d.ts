import { EventModel } from "./event.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
export declare class EventService {
    private readonly EventModel;
    constructor(EventModel: ModelType<EventModel>);
    createEvent(graphId: string, name: string, description: string, eventDate: Date, timeFrom: string, timeTo: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, EventModel> & Omit<EventModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getEventsByGraphId(graphId: string): Promise<({
        graphId: import("mongoose").Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: import("mongoose").Types.ObjectId;
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getUpcomingEvents(): Promise<({
        graphId: import("mongoose").Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        description: string;
        eventDate: Date;
        timeFrom: string;
        timeTo: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: import("mongoose").Types.ObjectId;
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}

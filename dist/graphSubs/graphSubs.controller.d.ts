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
import { Types } from "mongoose";
import { GraphSubsService } from "./graphSubs.service";
export declare class GraphSubsController {
    private readonly graphSubsService;
    constructor(graphSubsService: GraphSubsService);
    toggleSub(currentUserId: Types.ObjectId, body: {
        graphId: string;
    }): Promise<{
        subscribed: boolean;
    }>;
    getSubsSchedule(userId: Types.ObjectId): Promise<{
        schedule: any[];
        events: any[];
    }>;
    getSubsEvents(userId: Types.ObjectId): Promise<{
        isAttended: boolean;
        graphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        globalGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
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
        __v: number;
    }[]>;
}

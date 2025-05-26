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
import { Types } from "mongoose";
import { GraphService } from "./graph.service";
import { OptionalAuthContext } from "../interfaces/optional-auth.interface";
export declare class GraphController {
    private readonly graphService;
    constructor(graphService: GraphService);
    getGraphById(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./graph.model").GraphModel> & Omit<import("./graph.model").GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getParentGraphs(skip: any, authContext: OptionalAuthContext): Promise<any[]>;
    getAllChildrenGraphs(parentGraphId: string): Promise<({
        name: string;
        about?: string;
        ownerUserId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose").DocumentType<import("../user/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        subsNum: number;
        parentGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose").DocumentType<import("./graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        childGraphNum: number;
        imgPath?: string;
        directorName?: string;
        directorVkLink?: string;
        vkLink?: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}

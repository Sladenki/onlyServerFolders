/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/document" />
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
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GraphModel } from './graph.model';
import { GraphSubsModel } from 'src/graphSubs/graphSubs.model';
import { CreateGraphDto } from './dto/create-graph.dto';
import { CreateGlobalGraphDto } from './dto/create-global-graph.dto';
import { CreateTopicGraphDto } from './dto/create-topic-graph.dto';
import { Types } from 'mongoose';
import { GraphSubsService } from 'src/graphSubs/graphSubs.service';
import { S3Service } from 'src/s3/s3.service';
import type { Express } from 'express';
export declare class GraphService {
    private readonly GraphModel;
    private readonly graphSubsModel;
    private readonly graphSubsService;
    private readonly s3Service;
    constructor(GraphModel: ModelType<GraphModel>, graphSubsModel: ModelType<GraphSubsModel>, graphSubsService: GraphSubsService, s3Service: S3Service);
    createGraph(dto: CreateGraphDto, userId: Types.ObjectId, image?: Express.Multer.File): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, GraphModel> & Omit<GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getGraphById(id: Types.ObjectId): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, GraphModel> & Omit<GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getParentGraphs(skip: any, userId?: Types.ObjectId): Promise<({
        graphType: "default" | "global" | "topic";
        globalGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        city?: string;
        about?: string;
        ownerUserId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../user/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        subsNum: number;
        parentGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        childGraphNum: number;
        imgPath?: string;
        directorName?: string;
        directorVkLink?: string;
        vkLink?: string;
        websiteLink?: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllChildrenGraphs(parentGraphId: Types.ObjectId, skip: any, userId?: Types.ObjectId): Promise<({
        graphType: "default" | "global" | "topic";
        globalGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        city?: string;
        about?: string;
        ownerUserId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../user/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        subsNum: number;
        parentGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        childGraphNum: number;
        imgPath?: string;
        directorName?: string;
        directorVkLink?: string;
        vkLink?: string;
        websiteLink?: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllChildrenByTopic(parentGraphId: Types.ObjectId): Promise<({
        graphType: "default" | "global" | "topic";
        globalGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        city?: string;
        about?: string;
        ownerUserId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../user/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        subsNum: number;
        parentGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        childGraphNum: number;
        imgPath?: string;
        directorName?: string;
        directorVkLink?: string;
        vkLink?: string;
        websiteLink?: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllChildrenByGlobal(globalGraphId: Types.ObjectId): Promise<({
        graphType: "default" | "global" | "topic";
        globalGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        city?: string;
        about?: string;
        ownerUserId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../user/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        subsNum: number;
        parentGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        childGraphNum: number;
        imgPath?: string;
        directorName?: string;
        directorVkLink?: string;
        vkLink?: string;
        websiteLink?: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getTopicGraphs(parentGraphId: Types.ObjectId): Promise<any[]>;
    createGlobalGraph(dto: CreateGlobalGraphDto, userId: Types.ObjectId, image?: Express.Multer.File): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, GraphModel> & Omit<GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    createTopicGraph(dto: CreateTopicGraphDto, userId: Types.ObjectId, image?: Express.Multer.File): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, GraphModel> & Omit<GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getGlobalGraphs(): Promise<({
        graphType: "default" | "global" | "topic";
        globalGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        name: string;
        city?: string;
        about?: string;
        ownerUserId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../user/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        subsNum: number;
        parentGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        childGraphNum: number;
        imgPath?: string;
        directorName?: string;
        directorVkLink?: string;
        vkLink?: string;
        websiteLink?: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getTopicGraphsWithMain(globalGraphId: Types.ObjectId): Promise<{
        globalGraph: {
            graphType: "default" | "global" | "topic";
            globalGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
            name: string;
            city?: string;
            about?: string;
            ownerUserId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../user/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
            subsNum: number;
            parentGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
            childGraphNum: number;
            imgPath?: string;
            directorName?: string;
            directorVkLink?: string;
            vkLink?: string;
            websiteLink?: string;
            createdAt?: Date;
            updatedAt?: Date;
            _id: Types.ObjectId;
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
        topicGraphs: ({
            graphType: "default" | "global" | "topic";
            globalGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
            name: string;
            city?: string;
            about?: string;
            ownerUserId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../user/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
            subsNum: number;
            parentGraphId?: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
            childGraphNum: number;
            imgPath?: string;
            directorName?: string;
            directorVkLink?: string;
            vkLink?: string;
            websiteLink?: string;
            createdAt?: Date;
            updatedAt?: Date;
            _id: Types.ObjectId;
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
}

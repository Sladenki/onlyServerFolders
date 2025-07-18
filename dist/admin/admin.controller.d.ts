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
import { AdminService } from './admin.service';
import { UserRole } from './role.enum';
import { CreateGraphDto } from 'src/graph/dto/create-graph.dto';
import { Types } from 'mongoose';
import { GraphService } from 'src/graph/graph.service';
import type { Express } from 'express';
import { CreateGlobalGraphDto } from 'src/graph/dto/create-global-graph.dto';
import { CreateTopicGraphDto } from 'src/graph/dto/create-topic-graph.dto';
export declare class AdminController {
    private readonly adminService;
    private readonly graphService;
    constructor(adminService: AdminService, graphService: GraphService);
    assignRole(userId: string, role: UserRole): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../user/user.model").UserModel> & Omit<import("../user/user.model").UserModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    createGlobalGraph(dto: CreateGlobalGraphDto, userId: Types.ObjectId, image: Express.Multer.File): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../graph/graph.model").GraphModel> & Omit<import("../graph/graph.model").GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    createTopicGraph(dto: CreateTopicGraphDto, userId: Types.ObjectId, image: Express.Multer.File): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../graph/graph.model").GraphModel> & Omit<import("../graph/graph.model").GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    createGraph(dto: CreateGraphDto, userId: Types.ObjectId, image: Express.Multer.File): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../graph/graph.model").GraphModel> & Omit<import("../graph/graph.model").GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    transferGraphOwnership(graphId: string, newOwnerId: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../graph/graph.model").GraphModel> & Omit<import("../graph/graph.model").GraphModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getApplicationStats(): Promise<{
        totalUsers: number;
        totalGraphs: number;
        usersByRole: any;
    }>;
    getServerResourceStats(): Promise<{
        cpu: {
            model: string;
            cores: number;
            usage: {
                model: string;
                speed: number;
                usage: string;
            }[];
            averageUsage: string;
        };
        memory: {
            total: string;
            used: string;
            free: string;
            usagePercentage: string;
            processMemory: {
                heapUsed: string;
                heapTotal: string;
                heapUsagePercentage: string;
                rss: string;
                external: string;
            };
        };
        uptime: {
            seconds: number;
            formatted: string;
        };
        platform: {
            type: string;
            release: string;
            hostname: string;
        };
        systemLoad: {
            level: string;
            description: string;
            recommendations: string[];
        };
    }>;
}

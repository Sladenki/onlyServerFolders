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
import { ModelType } from "@typegoose/typegoose/lib/types";
import { UserModel } from "src/user/user.model";
import { UserRole } from "./role.enum";
import { GraphModel } from "src/graph/graph.model";
export declare class AdminService {
    private readonly UserModel;
    private readonly GraphModel;
    constructor(UserModel: ModelType<UserModel>, GraphModel: ModelType<GraphModel>);
    assignRole(userId: string, newRole: UserRole): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    transferGraphOwnership(graphId: string, newOwnerId: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, GraphModel> & Omit<GraphModel & Required<{
        _id: import("mongoose").Types.ObjectId;
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
    private getCpuUsage;
    private formatBytes;
    private formatPercentage;
    private formatUptime;
    private assessSystemLoad;
}

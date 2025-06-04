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
import { UserService } from './user.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Types } from 'mongoose';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    auth(dto: AuthUserDto): Promise<any>;
    getUser(id: string): Promise<{
        role: "create" | "admin" | "editor" | "sysadmin" | "user";
        selectedGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        firstName: string;
        lastName: string;
        username: string;
        avaPath: string;
        telegramId: any;
        graphSubsNum: number;
        postsNum: number;
        attentedEventsNum: number;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllUsers(lastId?: string, limit?: string): Promise<{
        users: ({
            role: "create" | "admin" | "editor" | "sysadmin" | "user";
            selectedGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
            firstName: string;
            lastName: string;
            username: string;
            avaPath: string;
            telegramId: any;
            graphSubsNum: number;
            postsNum: number;
            attentedEventsNum: number;
            createdAt?: Date;
            updatedAt?: Date;
            _id: Types.ObjectId;
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        hasMore: boolean;
    }>;
    getMe(req: any): Promise<any>;
    updateSelectedGraph(userId: Types.ObjectId, selectedGraphId: string): Promise<{
        role: "create" | "admin" | "editor" | "sysadmin" | "user";
        selectedGraphId: Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose/lib/types").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
        firstName: string;
        lastName: string;
        username: string;
        avaPath: string;
        telegramId: any;
        graphSubsNum: number;
        postsNum: number;
        attentedEventsNum: number;
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

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
import { ModelType } from '@typegoose/typegoose/lib/types';
import { GraphSubsModel } from './graphSubs.model';
import { Types } from 'mongoose';
import { PostService } from 'src/post/post.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { GraphModel } from 'src/graph/graph.model';
export declare class GraphSubsService {
    private readonly graphSubsModel;
    private readonly GraphModel;
    private readonly postService;
    private readonly scheduleService;
    constructor(graphSubsModel: ModelType<GraphSubsModel>, GraphModel: ModelType<GraphModel>, postService: PostService, scheduleService: ScheduleService);
    toggleSub(user: string | Types.ObjectId, graph: string | Types.ObjectId): Promise<void>;
    getSubsPosts(skip: any, userId: Types.ObjectId): Promise<any[]>;
    getSubsSchedule(userId: Types.ObjectId): Promise<any[]>;
    isUserSubsExists(graph: string, userId: string): Promise<boolean>;
}

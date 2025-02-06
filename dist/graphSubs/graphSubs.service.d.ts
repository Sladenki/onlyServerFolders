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

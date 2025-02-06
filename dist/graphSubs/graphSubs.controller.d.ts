import { Types } from "mongoose";
import { GraphSubsService } from "./graphSubs.service";
export declare class GraphSubsController {
    private readonly graphSubsService;
    constructor(graphSubsService: GraphSubsService);
    toggleSub(currentUserId: Types.ObjectId, body: {
        graphId: string;
    }): Promise<void>;
    getSubsPosts(skip: any, userId: Types.ObjectId): Promise<any[]>;
    getSubsSchedule(userId: Types.ObjectId): Promise<any[]>;
}

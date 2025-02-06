import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { UserPostReactionModel } from './userPostReaction.model';
import { PostReactionService } from 'src/postReaction/postReaction.service';
export declare class UserPostReactionService {
    private readonly userPostReactionModel;
    private readonly postReactionService;
    constructor(userPostReactionModel: ModelType<UserPostReactionModel>, postReactionService: PostReactionService);
    createUserAndReactionConnection(userId: Types.ObjectId, postReaction: string, postId: string, isReacted: boolean): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserPostReactionModel> & Omit<UserPostReactionModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    isUserReactionExists(reactionId: string, userId: string): Promise<boolean>;
}

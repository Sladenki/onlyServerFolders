import { UserPostReactionService } from "./userPostReaction.service";
import { Types } from "mongoose";
export declare class UserPostReactionController {
    private readonly userPostReactionPostService;
    constructor(userPostReactionPostService: UserPostReactionService);
    createUserAndReactionConnection(userId: Types.ObjectId, dto: {
        reactionId: string;
        postId: string;
        isReacted: boolean;
    }): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./userPostReaction.model").UserPostReactionModel> & Omit<import("./userPostReaction.model").UserPostReactionModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}

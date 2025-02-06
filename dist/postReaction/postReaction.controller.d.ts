import { Types } from "mongoose";
import { PostReactionService } from "./postReaction.service";
import { CreatePostReactionDto } from "./dto/createPostReaction.dto";
export declare class PostReactionController {
    private readonly postReactionService;
    constructor(postReactionService: PostReactionService);
    createPost(dto: CreatePostReactionDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./postReaction.model").PostReactionModel> & Omit<import("./postReaction.model").PostReactionModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    incrementClickNum(postId: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./postReaction.model").PostReactionModel> & Omit<import("./postReaction.model").PostReactionModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}

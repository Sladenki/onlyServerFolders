import { ModelType } from '@typegoose/typegoose/lib/types';
import { PostReactionModel } from './postReaction.model';
import { CreatePostReactionDto } from './dto/createPostReaction.dto';
import { Types } from 'mongoose';
export declare class PostReactionService {
    private readonly postReactionModel;
    constructor(postReactionModel: ModelType<PostReactionModel>);
    createPostReaction(dto: CreatePostReactionDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, PostReactionModel> & Omit<PostReactionModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    incrementClickNum(postId: Types.ObjectId): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, PostReactionModel> & Omit<PostReactionModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    decrementClickNum(postId: Types.ObjectId): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, PostReactionModel> & Omit<PostReactionModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}

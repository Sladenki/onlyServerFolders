import { PostService } from "./post.service";
import { Types } from "mongoose";
import { CreatePostDto } from "./dto/create-post.dto";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAllPostsWithInfoNoAuth(skip: any): Promise<any[]>;
    getAllPostsWithInfo(skip: any, userId: Types.ObjectId): Promise<any[]>;
    createPost(userId: Types.ObjectId, dto: CreatePostDto, imgPath: any): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./post.model").PostModel> & Omit<import("./post.model").PostModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}

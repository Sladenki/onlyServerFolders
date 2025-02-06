import { PostModel } from './post.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePostDto } from './dto/create-post.dto';
import { UserModel } from 'src/user/user.model';
import { Types } from 'mongoose';
import { GraphService } from 'src/graph/graph.service';
import { S3Service } from 'src/s3/s3.service';
import { PostReactionService } from 'src/postReaction/postReaction.service';
import { UserPostReactionService } from 'src/userPostReaction/userPostReaction.service';
import { GraphSubsService } from 'src/graphSubs/graphSubs.service';
export declare class PostService {
    private readonly PostModel;
    private readonly UserModel;
    private readonly graphService;
    private readonly s3Service;
    private readonly postReactionService;
    private readonly userPostReactionService;
    private readonly graphSubsService;
    constructor(PostModel: ModelType<PostModel>, UserModel: ModelType<UserModel>, graphService: GraphService, s3Service: S3Service, postReactionService: PostReactionService, userPostReactionService: UserPostReactionService, graphSubsService: GraphSubsService);
    createPost(dto: CreatePostDto, creatorId: Types.ObjectId): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, PostModel> & Omit<PostModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getPostsNoAuth(skip: any): Promise<any[]>;
    getPostsAuth(skip: any, userId: Types.ObjectId): Promise<any[]>;
    getPostsFromSubscribedGraphs(skip: any, subscribedGraphs: any[], userId: Types.ObjectId): Promise<any[]>;
}

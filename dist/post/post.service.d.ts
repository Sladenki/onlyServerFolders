/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/document" />
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
import { UserPostReactionModel } from 'src/userPostReaction/userPostReaction.model';
import { GraphSubsModel } from 'src/graphSubs/graphSubs.model';
export declare class PostService {
    private readonly PostModel;
    private readonly UserModel;
    private readonly userPostReactionModel;
    private readonly graphSubsModel;
    private readonly graphService;
    private readonly s3Service;
    private readonly postReactionService;
    private readonly userPostReactionService;
    private readonly graphSubsService;
    constructor(PostModel: ModelType<PostModel>, UserModel: ModelType<UserModel>, userPostReactionModel: ModelType<UserPostReactionModel>, graphSubsModel: ModelType<GraphSubsModel>, graphService: GraphService, s3Service: S3Service, postReactionService: PostReactionService, userPostReactionService: UserPostReactionService, graphSubsService: GraphSubsService);
    createPost(dto: CreatePostDto, creatorId: Types.ObjectId): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, PostModel> & Omit<PostModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getPostsNoAuth(skip: any): Promise<any[]>;
    getPostsAuth(skip: any, userId: Types.ObjectId): Promise<any[]>;
    getPostsFromSubscribedGraphs(skip: any, subscribedGraphs: any[], userId: Types.ObjectId): Promise<any[]>;
}

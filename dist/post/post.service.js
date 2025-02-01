"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const post_model_1 = require("./post.model");
const user_model_1 = require("../user/user.model");
const mongoose_1 = require("mongoose");
const posts_1 = require("../constants/posts");
const graph_service_1 = require("../graph/graph.service");
const s3_service_1 = require("../s3/s3.service");
const postReaction_service_1 = require("../postReaction/postReaction.service");
const userPostReaction_service_1 = require("../userPostReaction/userPostReaction.service");
const postReaction_model_1 = require("../postReaction/postReaction.model");
const graphSubs_service_1 = require("../graphSubs/graphSubs.service");
const userPostReaction_model_1 = require("../userPostReaction/userPostReaction.model");
const graphSubs_model_1 = require("../graphSubs/graphSubs.model");
let PostService = class PostService {
    constructor(PostModel, UserModel, userPostReactionModel, graphSubsModel, graphService, s3Service, postReactionService, userPostReactionService, graphSubsService) {
        this.PostModel = PostModel;
        this.UserModel = UserModel;
        this.userPostReactionModel = userPostReactionModel;
        this.graphSubsModel = graphSubsModel;
        this.graphService = graphService;
        this.s3Service = s3Service;
        this.postReactionService = postReactionService;
        this.userPostReactionService = userPostReactionService;
        this.graphSubsService = graphSubsService;
    }
    async createPost(dto, creatorId) {
        console.log('createPost', dto);
        const childrenTopic = dto.childrenTopic;
        console.log('childrenTopic', childrenTopic);
        const selectedTopicId = dto.selectedTopic;
        console.log('selectedTopicId', selectedTopicId);
        let childGraphId;
        if (childrenTopic && selectedTopicId) {
            const childGraph = await this.graphService.createChildGraph(childrenTopic, selectedTopicId);
            childGraphId = childGraph._id;
        }
        const reactionObject = JSON.parse(dto.reaction);
        this.UserModel.findByIdAndUpdate(creatorId, { $inc: { postsNum: 1 } }, { new: true })
            .exec();
        let imgPathUrl = undefined;
        if (dto.imgPath) {
            imgPathUrl = await this.s3Service.uploadFile(dto.imgPath);
        }
        const newPost = await this.PostModel.create({
            content: dto.content,
            user: creatorId,
            graphId: new mongoose_1.Types.ObjectId(selectedTopicId),
            ...(imgPathUrl && { imgPath: imgPathUrl.key }),
        });
        let reactionId = undefined;
        if (reactionObject) {
            const emoji = reactionObject.emoji || postReaction_model_1.Emoji.LOVE;
            const reactionDto = {
                ...reactionObject,
                emoji,
                post: newPost._id.toString(),
            };
            try {
                const reaction = await this.postReactionService.createPostReaction(reactionDto);
                reactionId = reaction._id;
                console.log('Reaction created successfully');
            }
            catch (error) {
                console.error('Error creating reaction:', error);
            }
        }
        if (reactionId) {
            await this.PostModel.findByIdAndUpdate(newPost._id, { $push: { reactions: reactionId } }, { new: true });
        }
        return newPost;
    }
    async getPostsNoAuth(skip) {
        const skipPosts = skip ? Number(skip) : 0;
        try {
            const posts = await this.PostModel.aggregate([
                { $sort: { createdAt: -1 } },
                { $skip: skipPosts },
                { $limit: posts_1.DEFAULTLIMIT_POSTS },
                {
                    $lookup: {
                        from: 'User',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        _id: 1,
                        user: {
                            _id: 1,
                            email: 1,
                            avaPath: 1,
                            name: 1,
                        },
                        graphId: 1,
                        content: 1,
                        imgPath: 1,
                        reactions: 1,
                        createdAt: 1,
                    },
                },
                {
                    $lookup: {
                        from: 'PostReaction',
                        localField: 'reactions',
                        foreignField: '_id',
                        as: 'reactions',
                    },
                },
                {
                    $lookup: {
                        from: 'Graph',
                        localField: 'graphId',
                        foreignField: '_id',
                        as: 'graphId',
                    },
                },
                { $unwind: { path: '$graphId', preserveNullAndEmptyArrays: true } },
            ]);
            return posts;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Could not fetch posts');
        }
    }
    async getPostsAuth(skip, userId) {
        const skipPosts = skip ? Number(skip) : 0;
        try {
            const posts = await this.PostModel.aggregate([
                { $sort: { createdAt: -1 } },
                { $skip: skipPosts },
                { $limit: posts_1.DEFAULTLIMIT_POSTS },
                {
                    $lookup: {
                        from: 'User',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'PostReaction',
                        localField: 'reactions',
                        foreignField: '_id',
                        as: 'reactions',
                    },
                },
                {
                    $lookup: {
                        from: 'Graph',
                        localField: 'graphId',
                        foreignField: '_id',
                        as: 'graphId',
                    },
                },
                { $unwind: { path: '$graphId', preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        _id: 1,
                        user: { _id: 1, name: 1, avaPath: 1 },
                        graphId: 1,
                        content: 1,
                        imgPath: 1,
                        reactions: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
            ]);
            const postsWithReactionsAndSubs = await Promise.all(posts.map(async (post) => {
                const reactionsWithStatus = await Promise.all(post.reactions.map(async (reaction) => {
                    const isReacted = await this.userPostReactionService.isUserReactionExists(reaction._id.toString(), userId.toString());
                    return {
                        ...reaction,
                        isReacted,
                    };
                }));
                const isSubscribed = await this.graphSubsService.isUserSubsExists(post.graphId._id.toString(), userId.toString());
                return {
                    ...post,
                    reactions: reactionsWithStatus,
                    isSubscribed,
                };
            }));
            return postsWithReactionsAndSubs;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Could not fetch posts');
        }
    }
    async getPostsFromSubscribedGraphs(skip, subscribedGraphs, userId) {
        const posts = await this.PostModel
            .find({ graphId: { $in: subscribedGraphs } })
            .populate('user', 'name avaPath')
            .populate('reactions', '_id text emoji clickNum')
            .populate('graphId', 'name')
            .skip(skip)
            .limit(posts_1.DEFAULTLIMIT_POSTS)
            .sort({ createdAt: -1 })
            .lean();
        const postsWithReactions = await Promise.all(posts.map(async (post) => {
            const reactionsWithStatus = await Promise.all(post.reactions.map(async (reaction) => {
                const isReacted = userId
                    ? await this.userPostReactionService.isUserReactionExists(reaction._id.toString(), userId.toString())
                    : false;
                return {
                    ...reaction,
                    isReacted,
                };
            }));
            return {
                ...post,
                reactions: reactionsWithStatus,
            };
        }));
        return postsWithReactions;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(post_model_1.PostModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(userPostReaction_model_1.UserPostReactionModel)),
    __param(3, (0, nestjs_typegoose_1.InjectModel)(graphSubs_model_1.GraphSubsModel)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, graph_service_1.GraphService,
        s3_service_1.S3Service,
        postReaction_service_1.PostReactionService,
        userPostReaction_service_1.UserPostReactionService,
        graphSubs_service_1.GraphSubsService])
], PostService);
//# sourceMappingURL=post.service.js.map
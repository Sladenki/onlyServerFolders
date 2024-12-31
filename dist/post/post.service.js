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
const taggedPost_service_1 = require("../taggedPost/taggedPost.service");
const postTag_service_1 = require("./../postTag/postTag.service");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const post_model_1 = require("./post.model");
const user_model_1 = require("../user/user.model");
const posts_1 = require("../constants/posts");
const graph_service_1 = require("../graph/graph.service");
const python_service_1 = require("../microservice/python.service");
const s3_service_1 = require("../s3/s3.service");
const postReaction_service_1 = require("../postReaction/postReaction.service");
const userPostReaction_service_1 = require("../userPostReaction/userPostReaction.service");
const postReaction_model_1 = require("../postReaction/postReaction.model");
let PostService = class PostService {
    constructor(PostModel, UserModel, graphService, postTagService, taggedPostService, pythonService, s3Service, postReactionService, userPostReactionService) {
        this.PostModel = PostModel;
        this.UserModel = UserModel;
        this.graphService = graphService;
        this.postTagService = postTagService;
        this.taggedPostService = taggedPostService;
        this.pythonService = pythonService;
        this.s3Service = s3Service;
        this.postReactionService = postReactionService;
        this.userPostReactionService = userPostReactionService;
    }
    async createPost(dto, creatorId) {
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
        const userId = creatorId.toString();
        const redisUserKey = `/user/getById/${userId}`;
        const keyWordsPromise = this.pythonService.extractKeywords(dto.content);
        let postIncrementPromise;
        let imgPathUrl = undefined;
        if (dto.imgPath) {
            imgPathUrl = '123';
        }
        const [keyWords] = await Promise.all([
            keyWordsPromise,
            postIncrementPromise,
        ]);
        const createdTags = await this.postTagService.createPostTag(keyWords);
        console.log('createdTags', createdTags);
        const newPost = await this.PostModel.create({
            content: dto.content,
            keywords: keyWords,
            user: creatorId,
            ...(childGraphId && { graphId: childGraphId }),
            ...(imgPathUrl && { imgPath: imgPathUrl.key }),
        });
        await Promise.all(createdTags.map((tag) => this.taggedPostService.createTaggedPost(newPost._id, tag._id)));
        if (reactionObject) {
            const emoji = reactionObject.emoji || postReaction_model_1.Emoji.LOVE;
            const reactionDto = {
                ...reactionObject,
                emoji,
                post: newPost._id.toString(),
            };
            try {
                await this.postReactionService.createPostReaction(reactionDto);
                console.log('Reaction created successfully');
            }
            catch (error) {
                console.error('Error creating reaction:', error);
            }
        }
        return newPost;
    }
    async getPosts(skip, userId) {
        const skipPosts = skip ? Number(skip) : 0;
        const posts = await this.PostModel.find()
            .populate('user', 'name avaPath')
            .skip(skipPosts)
            .limit(posts_1.DEFAULTLIMIT_POSTS)
            .sort({ createdAt: -1 })
            .lean();
        const postsWithReactions = await Promise.all(posts.map(async (post) => {
            const reactions = await this.postReactionService.findReactionsByPostId(post._id);
            const reactionsWithUserStatus = await Promise.all(reactions.map(async (reaction) => {
                const isReacted = userId
                    ? await this.userPostReactionService.isUserReactionExists(reaction._id.toString(), userId.toString())
                    : false;
                return {
                    _id: reaction._id,
                    text: reaction.text,
                    emoji: reaction.emoji,
                    clickNum: reaction.clickNum,
                    post: reaction.post,
                    createdAt: reaction.createdAt,
                    updatedAt: reaction.updatedAt,
                    isReacted,
                };
            }));
            const postIsReacted = reactionsWithUserStatus.some((reaction) => reaction.isReacted);
            return {
                ...post,
                reactions: reactionsWithUserStatus,
                isReacted: postIsReacted,
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
    __metadata("design:paramtypes", [Object, Object, graph_service_1.GraphService,
        postTag_service_1.PostTagService,
        taggedPost_service_1.TaggedPostService,
        python_service_1.PythonService,
        s3_service_1.S3Service,
        postReaction_service_1.PostReactionService,
        userPostReaction_service_1.UserPostReactionService])
], PostService);
//# sourceMappingURL=post.service.js.map
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { PostModel } from 'src/post/post.model';
import { PostTagModel } from 'src/postTag/postTag.model';
export interface TaggedPostModel extends Base {
}
export declare class TaggedPostModel extends TimeStamps {
    postId: Ref<PostModel>;
    postTagId: Ref<PostTagModel>;
}

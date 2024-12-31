import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { PostModel } from 'src/post/post.model';
export interface PostReactionModel extends Base {
}
export declare enum Emoji {
    LIKE = "\uD83D\uDC4D",
    LOVE = "\u2764\uFE0F",
    LAUGH = "\uD83D\uDE02",
    WOW = "\uD83D\uDE2E",
    SAD = "\uD83D\uDE22",
    ANGRY = "\uD83D\uDE21"
}
export declare class PostReactionModel extends TimeStamps {
    text?: string;
    emoji?: Emoji;
    clickNum: number;
    post: Ref<PostModel>;
}

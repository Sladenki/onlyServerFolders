import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { PostModel } from 'src/post/post.model';
export interface PostReactionModel extends Base {
}
export declare enum Emoji {
    LIKE = "\uD83D\uDC4D",
    LOVE = "\u2764\uFE0F",
    SHARP = "\uD83D\uDE0E",
    WOW = "\uD83D\uDE2E",
    SMILE = "\uD83D\uDE01",
    EXOLIDING_HEAD = "\uD83E\uDD2F"
}
export declare class PostReactionModel extends TimeStamps {
    text?: string;
    emoji?: Emoji;
    clickNum: number;
    post: Ref<PostModel>;
}

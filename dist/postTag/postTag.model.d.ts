import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface PostTagModel extends Base {
}
export declare class PostTagModel extends TimeStamps {
    name: string;
    postsNum: number;
}

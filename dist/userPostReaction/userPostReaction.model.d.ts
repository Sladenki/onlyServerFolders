import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { PostReactionModel } from 'src/postReaction/postReaction.model';
import { UserModel } from 'src/user/user.model';
export interface UserPostReactionModel extends Base {
}
export declare class UserPostReactionModel extends TimeStamps {
    postReaction: Ref<PostReactionModel>;
    user: Ref<UserModel>;
}

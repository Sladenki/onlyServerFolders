import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UserModel } from 'src/user/user.model';
export interface userSubsModel extends Base {
}
export declare class userSubsModel extends TimeStamps {
    fromUser: Ref<UserModel>;
    toUser: Ref<UserModel>;
}

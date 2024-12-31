import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    name: string;
    avaPath: string;
    followersNum: number;
    subsNum: number;
    postsNum: number;
}

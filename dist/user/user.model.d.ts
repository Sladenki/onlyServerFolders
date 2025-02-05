import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    name: string;
    avaPath: string;
    graphSubsNum: number;
    postsNum: number;
}

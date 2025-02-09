import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    avaPath: string;
    telegramId: any;
    graphSubsNum: number;
    postsNum: number;
}

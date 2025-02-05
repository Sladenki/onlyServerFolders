import { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { UserModel } from "src/user/user.model";
export interface GraphModel extends Base {
}
export declare class GraphModel extends TimeStamps {
    name: string;
    ownerUserId: Ref<UserModel>;
    subsNum: number;
    parentGraphId?: Ref<GraphModel>;
    childGraphNum: number;
}

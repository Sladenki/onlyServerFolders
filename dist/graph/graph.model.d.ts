import { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { UserModel } from "src/user/user.model";
export interface GraphModel extends Base {
}
export declare class GraphModel extends TimeStamps {
    graphType: "global" | "topic" | "default";
    globalGraphId?: Ref<GraphModel>;
    name: string;
    city?: string;
    about?: string;
    ownerUserId: Ref<UserModel>;
    subsNum: number;
    parentGraphId?: Ref<GraphModel>;
    childGraphNum: number;
    imgPath?: string;
    directorName?: string;
    directorVkLink?: string;
    vkLink?: string;
    websiteLink?: string;
}

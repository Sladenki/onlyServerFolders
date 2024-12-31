import { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { GraphModel } from "src/graph/graph.model";
import { UserModel } from "src/user/user.model";
export interface PostModel extends Base {
}
export declare class PostModel extends TimeStamps {
    user: Ref<UserModel>;
    content: string;
    imgPath?: string;
    graphId: Ref<GraphModel>;
}

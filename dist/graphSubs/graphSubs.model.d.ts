import { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { GraphModel } from "src/graph/graph.model";
import { UserModel } from "src/user/user.model";
export interface GraphSubsModel extends Base {
}
export declare class GraphSubsModel extends TimeStamps {
    user: Ref<UserModel>;
    graph: Ref<GraphModel>;
}

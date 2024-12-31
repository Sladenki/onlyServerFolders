import { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export interface GraphModel extends Base {
}
export declare class GraphModel extends TimeStamps {
    name: string;
    parentGraphId?: Ref<GraphModel>;
    childGraphNum: number;
}

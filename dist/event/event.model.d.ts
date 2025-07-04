import { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { GraphModel } from "src/graph/graph.model";
export interface EventModel extends Base {
}
export declare class EventModel extends TimeStamps {
    graphId: Ref<GraphModel>;
    globalGraphId: Ref<GraphModel>;
    name: string;
    place: string;
    description: string;
    eventDate: Date;
    timeFrom: string;
    timeTo: string;
    regedUsers: number;
}

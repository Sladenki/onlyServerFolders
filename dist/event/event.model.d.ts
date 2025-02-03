import { Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { GraphModel } from "src/graph/graph.model";
export declare class EventModel extends TimeStamps {
    graphId: Ref<GraphModel>;
    name: string;
    description: string;
    eventDate: Date;
    timeFrom: string;
    timeTo: string;
}

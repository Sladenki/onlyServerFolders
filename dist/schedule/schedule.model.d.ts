import { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { GraphModel } from "src/graph/graph.model";
export interface ScheduleModel extends Base {
}
export declare enum ScheduleType {
    LECTURE = "lecture",
    PRACTICE = "practice",
    REHEARSAL = "rehearsal",
    FIELD_EVENT = "field_event"
}
export declare class ScheduleModel extends TimeStamps {
    graphId: Ref<GraphModel>;
    name: string;
    type: string;
    roomNumber: number;
    dayOfWeek: number;
    timeFrom: string;
    timeTo: string;
}

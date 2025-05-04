import { ScheduleType } from "../schedule.model";
export declare class CreateScheduleDto {
    graphId: string;
    name: string;
    type: ScheduleType;
    roomNumber: number;
    dayOfWeek: number;
    timeFrom: string;
    timeTo: string;
}

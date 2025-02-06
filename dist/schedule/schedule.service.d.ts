import { ScheduleModel } from "./schedule.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
export declare class ScheduleService {
    private readonly ScheduleModel;
    constructor(ScheduleModel: ModelType<ScheduleModel>);
    createSchedule(scheduleDto: CreateScheduleDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, ScheduleModel> & Omit<ScheduleModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getWeekdaySchedulesByGraph(graphId: string): Promise<(import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, ScheduleModel> & Omit<ScheduleModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[]>;
    getWeekdaySchedulesByGraphs(graphIds: string[]): Promise<(import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, ScheduleModel> & Omit<ScheduleModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[]>;
}

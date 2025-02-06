import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { EventService } from "src/event/event.service";
export declare class ScheduleController {
    private readonly scheduleService;
    private readonly eventService;
    constructor(scheduleService: ScheduleService, eventService: EventService);
    createSchedule(body: CreateScheduleDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./schedule.model").ScheduleModel> & Omit<import("./schedule.model").ScheduleModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getWeeklyScheduleByGraphId(body: {
        graphId: string;
    }): Promise<(import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./schedule.model").ScheduleModel> & Omit<import("./schedule.model").ScheduleModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[]>;
    getFullScheduleByGraphId(body: {
        graphId: string;
    }): Promise<{
        schedule: (import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./schedule.model").ScheduleModel> & Omit<import("./schedule.model").ScheduleModel & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[];
        events: ({
            graphId: import("mongoose").Types.ObjectId | import("mongoose").FlattenMaps<import("@typegoose/typegoose").DocumentType<import("../graph/graph.model").GraphModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
            name: string;
            description: string;
            eventDate: Date;
            timeFrom: string;
            timeTo: string;
            createdAt?: Date;
            updatedAt?: Date;
            _id: import("mongoose").Types.ObjectId;
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getWeekdaySchedulesByGraphs(body: {
        graphIds: string[];
    }): Promise<(import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./schedule.model").ScheduleModel> & Omit<import("./schedule.model").ScheduleModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[]>;
}

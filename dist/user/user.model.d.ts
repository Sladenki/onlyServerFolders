import { Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { GraphModel } from "src/graph/graph.model";
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    role: 'create' | 'admin' | 'editor' | 'sysadmin' | 'user';
    selectedGraphId: Ref<GraphModel>;
    firstName: string;
    lastName: string;
    username: string;
    avaPath: string;
    telegramId: string;
    graphSubsNum: number;
    postsNum: number;
    attentedEventsNum: number;
    copyrightAgreementAccepted: boolean;
    copyrightAgreementAcceptedAt: Date;
}

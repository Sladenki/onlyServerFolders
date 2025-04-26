import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { EventModel } from 'src/event/event.model';
import { UserModel } from 'src/user/user.model';
export interface EventRegsModel extends Base {
}
export declare class EventRegsModel extends TimeStamps {
    userId: Ref<UserModel>;
    eventId: Ref<EventModel>;
}

import { UserService } from './user.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Types } from 'mongoose';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class UserController {
    private readonly userService;
    private readonly UserModel;
    constructor(userService: UserService, UserModel: ModelType<UserModel>);
    auth(dto: AuthUserDto): Promise<any>;
    getUser(id: string): Promise<{
        email: string;
        name: string;
        avaPath: string;
        graphSubsNum: number;
        postsNum: number;
        createdAt?: Date;
        updatedAt?: Date;
        _id: Types.ObjectId;
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getMe(req: any): Promise<any>;
}

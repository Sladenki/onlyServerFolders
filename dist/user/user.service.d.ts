import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { Types } from 'mongoose';
export declare class UserService {
    private readonly UserModel;
    private readonly jwtService;
    constructor(UserModel: ModelType<UserModel>, jwtService: JwtService);
    auth(dto: AuthUserDto): Promise<any>;
    getUserById(_id: Types.ObjectId): Promise<{
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
}

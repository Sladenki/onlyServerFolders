import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class AuthController {
    private jwtService;
    private readonly UserModel;
    constructor(jwtService: JwtService, UserModel: ModelType<UserModel>);
    googleAuth(): void;
    googleAuthRedirect(req: any, res: any): Promise<void>;
    logout(req: Request, res: any): Promise<void>;
    refresh(req: any, res: any): Promise<void>;
}

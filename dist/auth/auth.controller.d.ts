import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private jwtService;
    private readonly UserModel;
    private readonly configService;
    private supportsCapacitor;
    constructor(jwtService: JwtService, UserModel: ModelType<UserModel>, configService: ConfigService);
    googleAuth(): void;
    googleAuthRedirect(req: any, res: any): Promise<any>;
    private findOrCreateUser;
    logout(req: Request, res: any): Promise<void>;
    refresh(req: any, res: any): Promise<void>;
}

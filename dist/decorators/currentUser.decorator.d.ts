import { UserModel } from "src/user/user.model";
export declare const CurrentUser: (...dataOrPipes: (keyof UserModel | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export declare const OptionalCurrentUser: (...dataOrPipes: (keyof UserModel | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;

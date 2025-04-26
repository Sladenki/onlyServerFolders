import { UserRole } from "src/admin/role.enum";
export declare const Auth: () => MethodDecorator & ClassDecorator;
export declare const AuthRoles: (...roles: UserRole[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

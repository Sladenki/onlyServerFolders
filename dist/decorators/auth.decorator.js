"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoles = exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const AuthWithRoles_decorator_1 = require("./AuthWithRoles.decorator");
const Auth = () => (0, common_1.UseGuards)(auth_guard_1.AuthGuard);
exports.Auth = Auth;
const AuthRoles = (...roles) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('roles', roles), (0, common_1.UseGuards)(AuthWithRoles_decorator_1.AuthWithRolesGuard));
};
exports.AuthRoles = AuthRoles;
//# sourceMappingURL=auth.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalAuth = exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const OptionalAuthGuard_1 = require("./OptionalAuthGuard");
const auth_guard_1 = require("../auth/auth.guard");
const Auth = () => (0, common_1.UseGuards)(auth_guard_1.AuthGuard);
exports.Auth = Auth;
const OptionalAuth = () => (0, common_1.UseGuards)(OptionalAuthGuard_1.OptionalAuthGuard);
exports.OptionalAuth = OptionalAuth;
//# sourceMappingURL=auth.decorator.js.map
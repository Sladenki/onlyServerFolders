"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalAuth = exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const OptionalAuthGuard_1 = require("./OptionalAuthGuard");
const Auth = () => (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'));
exports.Auth = Auth;
const OptionalAuth = () => (0, common_1.UseGuards)(OptionalAuthGuard_1.OptionalAuthGuard);
exports.OptionalAuth = OptionalAuth;
//# sourceMappingURL=auth.decorator.js.map
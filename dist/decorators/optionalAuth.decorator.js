"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalAuth = exports.OPTIONAL_AUTH_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.OPTIONAL_AUTH_KEY = 'optionalAuth';
const OptionalAuth = () => (0, common_1.SetMetadata)(exports.OPTIONAL_AUTH_KEY, true);
exports.OptionalAuth = OptionalAuth;
//# sourceMappingURL=optionalAuth.decorator.js.map
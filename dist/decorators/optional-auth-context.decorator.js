"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOptionalAuthContext = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
exports.GetOptionalAuthContext = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return {
        isAuthenticated: !!user,
        userId: user?.sub ? new mongoose_1.Types.ObjectId(user.sub) : undefined,
        user: user
    };
});
//# sourceMappingURL=optional-auth-context.decorator.js.map
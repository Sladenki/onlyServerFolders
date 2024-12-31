"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalCurrentUser = exports.CurrentUser = void 0;
const decorators_1 = require("@nestjs/common/decorators");
exports.CurrentUser = (0, decorators_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
});
exports.OptionalCurrentUser = (0, decorators_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        return undefined;
    }
    return data ? user[data] : user;
});
//# sourceMappingURL=currentUser.decorator.js.map
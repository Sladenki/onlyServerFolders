"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const mongoose_1 = require("mongoose");
exports.CurrentUser = (0, decorators_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user)
        return undefined;
    if (data === '_id') {
        return new mongoose_1.Types.ObjectId(user.sub);
    }
    return data ? user[data] : user;
});
//# sourceMappingURL=currentUser.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalCurrentUser = exports.CurrentUser = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const mongoose_1 = require("mongoose");
exports.CurrentUser = (0, decorators_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('request.user', request.user);
    const user = request.user;
    const objectId = new mongoose_1.Types.ObjectId(user.sub);
    return objectId;
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
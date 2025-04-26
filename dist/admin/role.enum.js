"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleHierarchy = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Create"] = "create";
    UserRole["Admin"] = "admin";
    UserRole["Editor"] = "editor";
    UserRole["User"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.RoleHierarchy = {
    [UserRole.Create]: 3,
    [UserRole.Admin]: 2,
    [UserRole.Editor]: 1,
    [UserRole.User]: 0,
};
//# sourceMappingURL=role.enum.js.map
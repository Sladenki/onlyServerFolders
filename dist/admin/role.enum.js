"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleHierarchy = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Create"] = "create";
    UserRole["Admin"] = "admin";
    UserRole["Editor"] = "editor";
    UserRole["SysAdmin"] = "sysadmin";
    UserRole["User"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.RoleHierarchy = {
    [UserRole.Create]: 4,
    [UserRole.Admin]: 3,
    [UserRole.Editor]: 2,
    [UserRole.SysAdmin]: 1,
    [UserRole.User]: 0,
};
//# sourceMappingURL=role.enum.js.map
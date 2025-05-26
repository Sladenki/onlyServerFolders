export declare enum UserRole {
    Create = "create",
    Admin = "admin",
    Editor = "editor",
    SysAdmin = "sysadmin",
    User = "user"
}
export declare const RoleHierarchy: Record<UserRole, number>;

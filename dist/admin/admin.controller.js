"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const role_enum_1 = require("./role.enum");
const auth_decorator_1 = require("../decorators/auth.decorator");
const currentUser_decorator_1 = require("../decorators/currentUser.decorator");
const create_graph_dto_1 = require("../graph/dto/create-graph.dto");
const mongoose_1 = require("mongoose");
const graph_service_1 = require("../graph/graph.service");
const platform_express_1 = require("@nestjs/platform-express");
let AdminController = class AdminController {
    constructor(adminService, graphService) {
        this.adminService = adminService;
        this.graphService = graphService;
    }
    assignRole(userId, role) {
        return this.adminService.assignRole(userId, role);
    }
    createGraph(dto, userId, image) {
        return this.graphService.createGraph(dto, userId, image);
    }
    transferGraphOwnership(graphId, newOwnerId) {
        return this.adminService.transferGraphOwnership(graphId, newOwnerId);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, auth_decorator_1.AuthRoles)(role_enum_1.UserRole.Create),
    (0, common_1.Patch)('assignRole/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "assignRole", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.AuthRoles)(role_enum_1.UserRole.Editor),
    (0, common_1.Post)('createGraph'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentUser_decorator_1.CurrentUser)('_id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_graph_dto_1.CreateGraphDto, mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createGraph", null);
__decorate([
    (0, auth_decorator_1.AuthRoles)(role_enum_1.UserRole.Admin),
    (0, common_1.Patch)('transferGraphOwnership/:graphId'),
    __param(0, (0, common_1.Param)('graphId')),
    __param(1, (0, common_1.Body)('newOwnerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "transferGraphOwnership", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        graph_service_1.GraphService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map
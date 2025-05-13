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
exports.AdminService = void 0;
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const common_1 = require("@nestjs/common");
const user_model_1 = require("../user/user.model");
const graph_model_1 = require("../graph/graph.model");
let AdminService = class AdminService {
    constructor(UserModel, GraphModel) {
        this.UserModel = UserModel;
        this.GraphModel = GraphModel;
    }
    async assignRole(userId, newRole) {
        const user = await this.UserModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.role = newRole;
        return user.save();
    }
    async transferGraphOwnership(graphId, newOwnerId) {
        const graph = await this.GraphModel.findById(graphId);
        if (!graph)
            throw new common_1.NotFoundException('Graph not found');
        const newOwner = await this.UserModel.findById(newOwnerId);
        if (!newOwner)
            throw new common_1.NotFoundException('New owner not found');
        graph.ownerUserId = newOwner._id;
        return graph.save();
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(graph_model_1.GraphModel)),
    __metadata("design:paramtypes", [Object, Object])
], AdminService);
//# sourceMappingURL=admin.service.js.map
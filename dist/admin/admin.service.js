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
const os = require("os");
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
    async getApplicationStats() {
        const totalUsers = await this.UserModel.countDocuments();
        const totalGraphs = await this.GraphModel.countDocuments();
        const usersByRole = await this.UserModel.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            }
        ]);
        return {
            totalUsers,
            totalGraphs,
            usersByRole: usersByRole.reduce((acc, curr) => {
                acc[curr._id] = curr.count;
                return acc;
            }, {})
        };
    }
    async getServerResourceStats() {
        const cpus = await this.getCpuUsage();
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const memoryUsage = process.memoryUsage();
        const uptime = os.uptime();
        const avgCpuUsage = cpus.reduce((acc, cpu) => acc + parseFloat(cpu.usage), 0) / cpus.length;
        const memoryUsagePercentage = (usedMemory / totalMemory) * 100;
        const heapUsagePercentage = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
        const systemLoad = this.assessSystemLoad(avgCpuUsage, memoryUsagePercentage, heapUsagePercentage);
        return {
            cpu: {
                model: cpus[0].model,
                cores: cpus.length,
                usage: cpus,
                averageUsage: this.formatPercentage(avgCpuUsage)
            },
            memory: {
                total: this.formatBytes(totalMemory),
                used: this.formatBytes(usedMemory),
                free: this.formatBytes(freeMemory),
                usagePercentage: this.formatPercentage(memoryUsagePercentage),
                processMemory: {
                    heapUsed: this.formatBytes(memoryUsage.heapUsed),
                    heapTotal: this.formatBytes(memoryUsage.heapTotal),
                    heapUsagePercentage: this.formatPercentage(heapUsagePercentage),
                    rss: this.formatBytes(memoryUsage.rss),
                    external: this.formatBytes(memoryUsage.external)
                }
            },
            uptime: {
                seconds: uptime,
                formatted: this.formatUptime(uptime)
            },
            platform: {
                type: os.type(),
                release: os.release(),
                hostname: os.hostname()
            },
            systemLoad
        };
    }
    async getCpuUsage() {
        const snapshot = () => os.cpus().map(cpu => ({
            model: cpu.model,
            speed: cpu.speed,
            times: { ...cpu.times }
        }));
        const start = snapshot();
        await new Promise(resolve => setTimeout(resolve, 100));
        const end = snapshot();
        return start.map((startCpu, i) => {
            const endCpu = end[i];
            const totalDiff = Object.keys(startCpu.times).reduce((acc, key) => {
                const k = key;
                return acc + (endCpu.times[k] - startCpu.times[k]);
            }, 0);
            const idleDiff = endCpu.times.idle - startCpu.times.idle;
            const usage = ((1 - idleDiff / totalDiff) * 100);
            return {
                model: startCpu.model,
                speed: startCpu.speed,
                usage: this.formatPercentage(usage)
            };
        });
    }
    formatBytes(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0)
            return '0 Byte';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    }
    formatPercentage(value) {
        return value.toFixed(2) + '%';
    }
    formatUptime(seconds) {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${days}д ${hours}ч ${minutes}м ${secs}с`;
    }
    assessSystemLoad(cpuUsage, memoryUsage, heapUsage) {
        const thresholds = {
            critical: { cpu: 80, mem: 85, heap: 90 },
            high: { cpu: 60, mem: 70, heap: 80 },
            medium: { cpu: 40, mem: 50, heap: 60 }
        };
        if (cpuUsage > thresholds.critical.cpu || memoryUsage > thresholds.critical.mem || heapUsage > thresholds.critical.heap) {
            return {
                level: 'critical',
                description: 'Критическая нагрузка',
                recommendations: [
                    'Необходимо немедленное вмешательство',
                    'Рассмотрите возможность масштабирования',
                    'Проверьте наличие утечек памяти',
                    'Оптимизируйте запросы к базе данных'
                ]
            };
        }
        if (cpuUsage > thresholds.high.cpu || memoryUsage > thresholds.high.mem || heapUsage > thresholds.high.heap) {
            return {
                level: 'high',
                description: 'Высокая нагрузка',
                recommendations: [
                    'Рекомендуется мониторинг',
                    'Подготовьте план масштабирования',
                    'Проверьте оптимизацию кода'
                ]
            };
        }
        if (cpuUsage > thresholds.medium.cpu || memoryUsage > thresholds.medium.mem || heapUsage > thresholds.medium.heap) {
            return {
                level: 'medium',
                description: 'Средняя нагрузка',
                recommendations: [
                    'Система работает в нормальном режиме',
                    'Продолжайте мониторинг'
                ]
            };
        }
        return {
            level: 'low',
            description: 'Низкая нагрузка',
            recommendations: [
                'Система работает оптимально',
                'Ресурсы используются эффективно'
            ]
        };
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
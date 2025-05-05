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
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const easy_yandex_s3_1 = require("easy-yandex-s3");
let S3Service = class S3Service {
    constructor() {
        this.s3 = new easy_yandex_s3_1.default({
            auth: {
                accessKeyId: process.env.YANDEX_S3_ACCESS_KEY,
                secretAccessKey: process.env.YANDEX_S3_SECRET_KEY,
            },
            Bucket: process.env.YANDEX_S3_BUCKET_NAME,
            debug: false,
        });
    }
    async uploadFile(file, customPath) {
        const uploadResult = await this.s3.Upload({
            buffer: file.buffer,
            name: customPath || `uploads/${Date.now()}_${file.originalname}`,
        }, '/images');
        return uploadResult;
    }
    async deleteFile(filePath) {
        const deleteResult = await this.s3.Remove(filePath);
        return deleteResult;
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
//# sourceMappingURL=s3.service.js.map
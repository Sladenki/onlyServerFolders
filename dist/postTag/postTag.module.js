"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostTagModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const postTag_contoller_1 = require("./postTag.contoller");
const postTag_service_1 = require("./postTag.service");
const postTag_model_1 = require("./postTag.model");
let PostTagModule = class PostTagModule {
};
exports.PostTagModule = PostTagModule;
exports.PostTagModule = PostTagModule = __decorate([
    (0, common_1.Module)({
        controllers: [postTag_contoller_1.PostTagController],
        providers: [postTag_service_1.PostTagService],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: postTag_model_1.PostTagModel,
                    schemaOptions: { collection: 'PostTag' },
                },
            ]),
        ],
        exports: [postTag_service_1.PostTagService],
    })
], PostTagModule);
//# sourceMappingURL=postTag.module.js.map
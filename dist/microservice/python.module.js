"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PythonModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const python_controller_1 = require("./python.controller");
const python_service_1 = require("./python.service");
let PythonModule = class PythonModule {
};
exports.PythonModule = PythonModule;
exports.PythonModule = PythonModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [python_service_1.PythonService],
        controllers: [python_controller_1.PythonController],
        exports: [python_service_1.PythonService]
    })
], PythonModule);
//# sourceMappingURL=python.module.js.map
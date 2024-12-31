"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConfig = void 0;
const getMongoConfig = async (ConfigService) => ({
    uri: ConfigService.get('MONGO_URL'),
});
exports.getMongoConfig = getMongoConfig;
//# sourceMappingURL=mongo.config.js.map
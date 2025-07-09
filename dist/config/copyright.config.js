"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCopyrightConfig = void 0;
const getCopyrightConfig = (configService) => ({
    pdfPath: configService.get('COPYRIGHT_AGREEMENT_PDF_PATH') || './documents/agreement.pdf',
});
exports.getCopyrightConfig = getCopyrightConfig;
//# sourceMappingURL=copyright.config.js.map
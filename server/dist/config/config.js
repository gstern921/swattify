"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.IS_PROD = void 0;
const NODE_ENV = process.env.NODE_ENV || 'development';
exports.IS_PROD = NODE_ENV.toLowerCase() === 'production';
exports.DATABASE_URL = process.env.DATABASE_URL;
//# sourceMappingURL=config.js.map
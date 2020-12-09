"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const app_config_1 = require("./app.config");
const dbConfig = {
    client: 'pg',
    connection: app_config_1.DATABASE_URL,
};
exports.default = knex_1.default(dbConfig);
//# sourceMappingURL=db.js.map
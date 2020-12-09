"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const app_config_1 = require("./app.config");
const dbOptions = {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
};
const db = new sequelize_1.Sequelize(app_config_1.DATABASE_URL, dbOptions);
exports.default = db;
//# sourceMappingURL=db.js.map
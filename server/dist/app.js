"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app_config_1 = require("./config/app.config");
const app = express_1.default();
if (!app_config_1.IS_PROD) {
    app.use(morgan_1.default('dev'));
}
app.use(cors_1.default({ origin: app_config_1.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.get('/', (_req, res, _next) => {
    res.send('hello');
});
exports.default = app;
//# sourceMappingURL=app.js.map
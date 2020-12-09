"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const passport_1 = __importDefault(require("./config/passport"));
const app_config_1 = require("./config/app.config");
const passport_2 = __importDefault(require("passport"));
const app = express_1.default();
app.set('trust proxy', 1);
passport_1.default(passport_2.default);
if (!app_config_1.IS_PROD) {
    app.use(morgan_1.default('dev'));
}
app.use(cors_1.default({ origin: app_config_1.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const SequelizeStore = connect_session_sequelize_1.default(express_session_1.default.Store);
app.use(express_session_1.default({
    name: app_config_1.SESSION_COOKIE_NAME,
    secret: app_config_1.SESSION_SECRET,
    cookie: {
        secure: app_config_1.IS_PROD,
        sameSite: 'lax',
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: db_1.default }),
    proxy: true,
}));
app.use(passport_2.default.initialize());
app.use(passport_2.default.session());
app.get('/', (_req, res, _next) => {
    res.send('hello');
});
app.use('/auth', auth_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
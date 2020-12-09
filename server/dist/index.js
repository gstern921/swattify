#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require('dotenv').config(path_1.default.join(__dirname, '.env'));
const app_1 = __importDefault(require("./app"));
const debug_1 = __importDefault(require("debug"));
debug_1.default('server:server');
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./config/db"));
console.log(db_1.default);
console.log(process.env.DATABASE_URL);
const port = normalizePort(process.env.PORT || '3000');
app_1.default.set('trust proxy', 1);
app_1.default.set('port', port);
const server = http_1.default.createServer(app_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
    debug_1.default('Listening on ' + bind);
}
//# sourceMappingURL=index.js.map
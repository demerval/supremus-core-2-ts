"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_firebird_1 = __importDefault(require("node-firebird"));
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.prototype.open = function (callback, configDb) {
        if (configDb === undefined) {
            configDb = {
                host: process.env.APP_DB_HOST,
                port: Number(process.env.APP_DB_PORT),
                database: process.env.APP_DB_DATABASE,
                user: process.env.APP_DB_USER,
                password: process.env.APP_DB_PASSWORD,
                lowercase_keys: false,
                role: process.env.APP_DB_ROLE,
                pageSize: Number(process.env.APP_DB_PAGE_SIZE),
            };
        }
        return node_firebird_1.default.attach(configDb, callback);
    };
    default_1.prototype.openTransaction = function (db, callback) {
        db.transaction(node_firebird_1.default.ISOLATION_READ_COMMITED, function (err, transaction) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, transaction);
        });
    };
    return default_1;
}());
exports.default = default_1;
;

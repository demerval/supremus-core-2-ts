"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FirebirdFactory_1 = __importDefault(require("./conexao/FirebirdFactory"));
var DAO = /** @class */ (function () {
    function DAO(configDb) {
        this.fb = new FirebirdFactory_1.default();
        this.configDb = configDb;
    }
    DAO.prototype.openConexao = function (openTransacao) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.transaction = undefined;
            _this.db = undefined;
            _this.fb.open(function (err, db) {
                if (err) {
                    return reject(err.message);
                }
                _this.db = db;
                if (!openTransacao) {
                    return resolve();
                }
                _this.fb.openTransaction(_this.db, function (err, transaction) {
                    if (err) {
                        return reject(err.message);
                    }
                    _this.transaction = transaction;
                    return resolve();
                });
            }, _this.configDb);
        });
    };
    DAO.prototype.isConexaoOpen = function () {
        return this.db !== undefined;
    };
    DAO.prototype.isTransacao = function () {
        return this.transaction !== undefined;
    };
    DAO.prototype.executarSql = function (sql, params) {
        var _this = this;
        if (this.transaction !== undefined) {
            return new Promise(function (resolve, reject) {
                var _a;
                (_a = _this.transaction) === null || _a === void 0 ? void 0 : _a.query(sql, params, function (err, rows) {
                    var _a;
                    if (err) {
                        (_a = _this.transaction) === null || _a === void 0 ? void 0 : _a.rollback();
                        _this.closeConexao();
                        return reject(err.message);
                    }
                    return resolve(rows);
                });
            });
        }
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = _this.db) === null || _a === void 0 ? void 0 : _a.query(sql, params, function (err, rows) {
                if (err) {
                    _this.closeConexao();
                    return reject(err.message);
                }
                return resolve(rows);
            });
        });
    };
    DAO.prototype.confirmarTransacao = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = _this.transaction) === null || _a === void 0 ? void 0 : _a.commit(function (err) {
                if (err) {
                    return reject(err.message);
                }
                return resolve();
            });
        });
    };
    DAO.prototype.closeConexao = function () {
        if (this.db !== undefined) {
            this.db.detach();
        }
        this.transaction = undefined;
        this.db = undefined;
    };
    DAO.prototype.gerarId = function (generatorName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            var sql = "SELECT GEN_ID(" + generatorName + ", 1) AS GEN FROM RDB$DATABASE";
            (_a = _this.db) === null || _a === void 0 ? void 0 : _a.query(sql, [], function (err, rows) {
                if (err) {
                    return reject(err.message);
                }
                return resolve(rows[0].GEN);
            });
        });
    };
    return DAO;
}());
exports.default = DAO;

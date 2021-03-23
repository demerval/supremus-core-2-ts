"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirebirdFactory_1 = __importDefault(require("./conexao/FirebirdFactory"));
class DAO {
    constructor(configDb) {
        this.fb = new FirebirdFactory_1.default();
        this.configDb = configDb;
    }
    openConexao(openTransacao) {
        return new Promise((resolve, reject) => {
            this.transaction = undefined;
            this.db = undefined;
            this.fb.open((err, db) => {
                if (err) {
                    return reject(err.message);
                }
                this.db = db;
                if (!openTransacao) {
                    return resolve();
                }
                this.fb.openTransaction(this.db, (err, transaction) => {
                    if (err) {
                        return reject(err.message);
                    }
                    this.transaction = transaction;
                    return resolve();
                });
            }, this.configDb);
        });
    }
    isConexaoOpen() {
        return this.db !== undefined;
    }
    isTransacao() {
        return this.transaction !== undefined;
    }
    executarSql(sql, params) {
        if (this.transaction !== undefined) {
            return new Promise((resolve, reject) => {
                var _a;
                (_a = this.transaction) === null || _a === void 0 ? void 0 : _a.query(sql, params, (err, rows) => {
                    var _a;
                    if (err) {
                        (_a = this.transaction) === null || _a === void 0 ? void 0 : _a.rollback();
                        this.closeConexao();
                        return reject(err.message);
                    }
                    return resolve(rows);
                });
            });
        }
        return new Promise((resolve, reject) => {
            var _a;
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.query(sql, params, (err, rows) => {
                if (err) {
                    this.closeConexao();
                    return reject(err.message);
                }
                return resolve(rows);
            });
        });
    }
    confirmarTransacao() {
        return new Promise((resolve, reject) => {
            var _a;
            (_a = this.transaction) === null || _a === void 0 ? void 0 : _a.commit(function (err) {
                if (err) {
                    return reject(err.message);
                }
                return resolve();
            });
        });
    }
    closeConexao() {
        if (this.db !== undefined) {
            this.db.detach();
        }
        this.transaction = undefined;
        this.db = undefined;
    }
    gerarId(generatorName) {
        return new Promise((resolve, reject) => {
            var _a;
            var sql = `SELECT GEN_ID(${generatorName}, 1) AS GEN FROM RDB$DATABASE`;
            (_a = this.db) === null || _a === void 0 ? void 0 : _a.query(sql, [], (err, rows) => {
                if (err) {
                    return reject(err.message);
                }
                return resolve(rows[0].GEN);
            });
        });
    }
}
exports.default = DAO;

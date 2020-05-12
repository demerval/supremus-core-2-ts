"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaveEstrangeiraUtil = {
    criar: function (dao, chavesEstrangeiras) {
        return __awaiter(this, void 0, void 0, function () {
            var chavesEstrangeiras_1, chavesEstrangeiras_1_1, config, existe, indice, nomeFk, onUpdate, onDelete, sql, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, 8, 9]);
                        chavesEstrangeiras_1 = __values(chavesEstrangeiras), chavesEstrangeiras_1_1 = chavesEstrangeiras_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!chavesEstrangeiras_1_1.done) return [3 /*break*/, 6];
                        config = chavesEstrangeiras_1_1.value;
                        return [4 /*yield*/, this.verificarChaveEstrangeiraExiste(dao, config.nomeTabela, config.nomeCampoFk)];
                    case 2:
                        existe = _b.sent();
                        if (existe === true) {
                            return [3 /*break*/, 5];
                        }
                        return [4 /*yield*/, this._indiceChaveEstrangeira(dao, config.nomeTabela)];
                    case 3:
                        indice = _b.sent();
                        nomeFk = "FK_" + config.nomeTabela + "_" + indice;
                        onUpdate = config.onUpdate ? config.onUpdate.toUpperCase() : 'NO ACTION';
                        onDelete = config.onDelete ? config.onDelete.toUpperCase() : 'NO ACTION';
                        sql = "alter table " + config.nomeTabela + " "
                            + "add constraint " + nomeFk + " "
                            + "foreign key (" + config.nomeCampoFk + ") "
                            + "references " + config.nomeTabelaFk + " (" + config.nomeCampoTabelaFk + ") "
                            + "on update " + onUpdate + " "
                            + "on delete " + onDelete;
                        return [4 /*yield*/, dao.executarSql(sql)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        chavesEstrangeiras_1_1 = chavesEstrangeiras_1.next();
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (chavesEstrangeiras_1_1 && !chavesEstrangeiras_1_1.done && (_a = chavesEstrangeiras_1.return)) _a.call(chavesEstrangeiras_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, true];
                }
            });
        });
    },
    verificarChaveEstrangeiraExiste: function (dao, nomeTabela, campo) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT RDB$FIELD_NAME FROM RDB$RELATION_CONSTRAINTS C, RDB$INDEX_SEGMENTS S "
                            + "WHERE C.RDB$CONSTRAINT_TYPE = 'FOREIGN KEY' "
                            + "AND S.RDB$INDEX_NAME = C.RDB$INDEX_NAME "
                            + "AND RDB$RELATION_NAME = ? "
                            + "AND RDB$FIELD_NAME = ?";
                        return [4 /*yield*/, dao.executarSql(sql, [nomeTabela, campo.toUpperCase()])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, (result.length === 1)];
                }
            });
        });
    },
    _indiceChaveEstrangeira: function (dao, nomeTabela) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, indice, valores, rows, rows_1, rows_1_1, row, s;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "SELECT r.RDB$CONSTRAINT_NAME AS NOME, r.RDB$INDEX_NAME AS INDEX_NAME "
                            + "FROM RDB$RELATION_CONSTRAINTS r "
                            + "WHERE RDB$RELATION_NAME = ? "
                            + "AND RDB$CONSTRAINT_TYPE = 'FOREIGN KEY'";
                        indice = 0;
                        valores = [];
                        return [4 /*yield*/, dao.executarSql(sql, [nomeTabela])];
                    case 1:
                        rows = _b.sent();
                        try {
                            for (rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                                row = rows_1_1.value;
                                s = row.INDEX_NAME.split('_');
                                valores.push(parseInt(s[s.length - 1]));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (rows_1_1 && !rows_1_1.done && (_a = rows_1.return)) _a.call(rows_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (valores.length > 0) {
                            valores.sort(function (a, b) { return a - b; });
                            indice = (valores[valores.length - 1] + 1);
                        }
                        return [2 /*return*/, indice];
                }
            });
        });
    },
};

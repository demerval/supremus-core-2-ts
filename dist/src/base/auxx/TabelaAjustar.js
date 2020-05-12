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
var TabelaUtil_1 = require("./TabelaUtil");
var TabelaCriar_1 = require("./TabelaCriar");
var ChavePrimariaUtil_1 = require("./ChavePrimariaUtil");
var ChaveEstrangeiraUtil_1 = require("./ChaveEstrangeiraUtil");
exports.TabelaAjustar = {
    verificarTabela: function (dao, config) {
        return __awaiter(this, void 0, void 0, function () {
            var nomeTabela, sql, rows, existe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nomeTabela = config.nomeTabela;
                        sql = "SELECT VERSAO FROM ESTRUTURA_VERSAO WHERE TABELA = ?";
                        return [4 /*yield*/, dao.executarSql(sql, [nomeTabela])];
                    case 1:
                        rows = _a.sent();
                        if (!(rows.length === 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, TabelaUtil_1.TabelaUtil.tabelaExiste(dao, nomeTabela)];
                    case 2:
                        existe = _a.sent();
                        if (!(existe === false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, TabelaCriar_1.TabelaCriar.criar(dao, config)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [4 /*yield*/, this.ajustarTabela(dao, config)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, TabelaUtil_1.TabelaUtil.atualizarVersaoTabela(dao, config)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        if (config.versao <= rows[0].VERSAO) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.ajustarTabela(dao, config)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, TabelaUtil_1.TabelaUtil.atualizarVersaoTabela(dao, config)];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    ajustarTabela: function (dao, config) {
        return __awaiter(this, void 0, void 0, function () {
            var campos, campos_1, campos_1_1, campo, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        campos = config.campos.values();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        campos_1 = __values(campos), campos_1_1 = campos_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!campos_1_1.done) return [3 /*break*/, 5];
                        campo = campos_1_1.value;
                        return [4 /*yield*/, this.verificarCampo(dao, config, campo)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        campos_1_1 = campos_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (campos_1_1 && !campos_1_1.done && (_a = campos_1.return)) _a.call(campos_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, true];
                }
            });
        });
    },
    verificarCampo: function (dao, config, campo) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT RDB$RELATION_NAME, RDB$FIELD_NAME FROM RDB$RELATION_FIELDS "
                            + "WHERE RDB$FIELD_NAME = '" + campo.getNome() + "' AND "
                            + "RDB$RELATION_NAME = '" + config.nomeTabela + "';";
                        return [4 /*yield*/, dao.executarSql(sql)];
                    case 1:
                        rows = _a.sent();
                        if (rows.length === 0) {
                            return [2 /*return*/, this.criarCampo(dao, config, campo)];
                        }
                        if (campo.getTipo() === 'varchar') {
                            return [2 /*return*/, this.ajustarCampo(dao, config.nomeTabela, campo)];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    },
    criarCampo: function (dao, config, campo) {
        return __awaiter(this, void 0, void 0, function () {
            var tipo, sql, chavePrimaria, sqlCriarPrimaryKey, nomeGerador, sqlCriarGenerator, chaveEstrangeira, chave;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tipo = campo.getTipo().toUpperCase();
                        sql = "ALTER TABLE " + config.nomeTabela + " ADD "
                            + campo.getNome() + " " + tipo;
                        if (tipo === "VARCHAR") {
                            sql += "(" + campo.getTamanhoMaximo() + ")";
                        }
                        if (tipo === 'NUMERIC') {
                            sql += '(18, ' + campo.getDecimal() + ')';
                        }
                        if (tipo === 'BLOB') {
                            sql += ' SUB_TYPE 1 SEGMENT SIZE 80';
                        }
                        if (campo.isObrigatorio() === true || campo.isChavePrimaria() === true) {
                            sql += " NOT NULL";
                        }
                        sql += ";";
                        return [4 /*yield*/, dao.executarSql(sql)];
                    case 1:
                        _a.sent();
                        if (!(campo.isChavePrimaria() === true)) return [3 /*break*/, 3];
                        chavePrimaria = campo.getChavePrimaria();
                        sqlCriarPrimaryKey = "ALTER TABLE " + config.nomeTabela + " "
                            + "ADD CONSTRAINT PK_" + config.nomeTabela + " "
                            + "PRIMARY KEY (" + campo.getNome() + ");";
                        config.configChavePrimaria = {
                            nomeTabela: config.nomeTabela,
                            sql: sqlCriarPrimaryKey,
                        };
                        if (chavePrimaria === null || chavePrimaria === void 0 ? void 0 : chavePrimaria.autoIncremento) {
                            nomeGerador = chavePrimaria.nomeGerador ? chavePrimaria.nomeGerador : config.nomeTabela + "_GEN";
                            sqlCriarGenerator = "CREATE SEQUENCE " + nomeGerador + ";";
                            config.configGerador = {
                                nomeGerador: nomeGerador,
                                sql: sqlCriarGenerator,
                            };
                        }
                        return [4 /*yield*/, ChavePrimariaUtil_1.ChavePrimariaUtil.criarChavePrimaria(dao, config.configChavePrimaria)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(campo.isChaveEstrangeira() === true)) return [3 /*break*/, 5];
                        chaveEstrangeira = campo.getChaveEstrangeira();
                        chave = {
                            nomeTabela: config.nomeTabela,
                            nomeTabelaFk: chaveEstrangeira.nomeTabela.toUpperCase(),
                            nomeCampoFk: campo.getNome(),
                            nomeCampoTabelaFk: chaveEstrangeira.nomeCampo.toUpperCase(),
                            onUpdate: chaveEstrangeira.onUpdate || 'NO ACTION',
                            onDelete: chaveEstrangeira.onDelete || 'NO ACTION',
                        };
                        config.configChaveEstrangeira.push(chave);
                        return [4 /*yield*/, ChaveEstrangeiraUtil_1.ChaveEstrangeiraUtil.criar(dao, config.configChaveEstrangeira)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, true];
                }
            });
        });
    },
    ajustarCampo: function (dao, nomeTabela, campo) {
        return __awaiter(this, void 0, void 0, function () {
            var ajustar, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verificarTamanhoCampo(dao, nomeTabela, campo)];
                    case 1:
                        ajustar = _a.sent();
                        if (!(ajustar === true)) return [3 /*break*/, 3];
                        sql = "ALTER TABLE "
                            + nomeTabela
                            + " ALTER "
                            + campo.getNome()
                            + " TYPE VARCHAR("
                            + campo.getTamanhoMaximo()
                            + ");";
                        return [4 /*yield*/, dao.executarSql(sql)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    },
    verificarTamanhoCampo: function (dao, nomeTabela, campo) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT RDB$RELATION_FIELDS.RDB$FIELD_NAME FIELD_NAME, "
                            + "RDB$FIELDS.RDB$FIELD_LENGTH FIELD_SIZE "
                            + "FROM RDB$RELATION_FIELDS "
                            + "JOIN RDB$FIELDS "
                            + "ON RDB$FIELDS.RDB$FIELD_NAME = "
                            + "RDB$RELATION_FIELDS.RDB$FIELD_SOURCE "
                            + "JOIN RDB$TYPES "
                            + "ON RDB$FIELDS.RDB$FIELD_TYPE = RDB$TYPES.RDB$TYPE AND "
                            + "RDB$TYPES.RDB$FIELD_NAME = 'RDB$FIELD_TYPE' "
                            + "WHERE RDB$RELATION_FIELDS.RDB$RELATION_NAME = '" + nomeTabela + "'"
                            + "AND RDB$RELATION_FIELDS.RDB$FIELD_NAME = '" + campo.getNome() + "';";
                        return [4 /*yield*/, dao.executarSql(sql)];
                    case 1:
                        rows = _a.sent();
                        if (rows.length === 0) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, campo.getTamanhoMaximo() > rows[0].FIELD_SIZE];
                }
            });
        });
    },
};
exports.default = exports.TabelaAjustar;

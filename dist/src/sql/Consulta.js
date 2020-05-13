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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DAO_1 = __importDefault(require("../database/DAO"));
var SqlConsulta_1 = __importDefault(require("./SqlConsulta"));
var ModelConverter_1 = require("../model/auxx/ModelConverter");
var ModelManager_1 = __importDefault(require("../model/ModelManager"));
var Consulta = /** @class */ (function () {
    function Consulta() {
    }
    Consulta.prototype.consultar = function (config, dao) {
        return __awaiter(this, void 0, void 0, function () {
            var openDao, dados, rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        openDao = (dao === undefined);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, 9, 10]);
                        if (!(openDao === true)) return [3 /*break*/, 3];
                        dao = new DAO_1.default();
                        return [4 /*yield*/, dao.openConexao()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (config instanceof Array) {
                            throw new Error('Consulta padrao não pode ser um array.');
                        }
                        dados = new SqlConsulta_1.default().getDadosConsulta(config);
                        return [4 /*yield*/, dao.executarSql(dados.sql)];
                    case 4:
                        rows = _a.sent();
                        if (!config.subConsultas) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._subConsulta(dao, dados.campos, config.subConsultas, rows)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, ModelConverter_1.ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows)];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 9:
                        if (openDao === true) {
                            if (dao.isConexaoOpen()) {
                                dao.closeConexao();
                            }
                        }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Consulta.prototype.consultarArray = function (config, dao) {
        return __awaiter(this, void 0, void 0, function () {
            var openDao, rowsResult, config_1, config_1_1, c, dados, rows, _a, _b, e_1_1, error_2;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        openDao = (dao === undefined);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 15, 16, 17]);
                        if (!(openDao === true)) return [3 /*break*/, 3];
                        dao = new DAO_1.default();
                        return [4 /*yield*/, dao.openConexao()];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        if (!(config instanceof Array)) {
                            throw new Error('Consulta por array precisa ser um array.');
                        }
                        rowsResult = {};
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 12, 13, 14]);
                        config_1 = __values(config), config_1_1 = config_1.next();
                        _d.label = 5;
                    case 5:
                        if (!!config_1_1.done) return [3 /*break*/, 11];
                        c = config_1_1.value;
                        dados = new SqlConsulta_1.default().getDadosConsulta(c);
                        return [4 /*yield*/, dao.executarSql(dados.sql)];
                    case 6:
                        rows = _d.sent();
                        if (!c.subConsultas) return [3 /*break*/, 8];
                        return [4 /*yield*/, this._subConsulta(dao, dados.campos, c.subConsultas, rows)];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8:
                        _a = rowsResult;
                        _b = c.key;
                        return [4 /*yield*/, ModelConverter_1.ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows)];
                    case 9:
                        _a[_b] = _d.sent();
                        _d.label = 10;
                    case 10:
                        config_1_1 = config_1.next();
                        return [3 /*break*/, 5];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (config_1_1 && !config_1_1.done && (_c = config_1.return)) _c.call(config_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, rowsResult];
                    case 15:
                        error_2 = _d.sent();
                        throw new Error(error_2);
                    case 16:
                        if (openDao === true) {
                            if (dao.isConexaoOpen()) {
                                dao.closeConexao();
                            }
                        }
                        return [7 /*endfinally*/];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    Consulta.prototype.consultarPorId = function (config, dao) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var openDao, model, chaveCampo, dados, rows, result, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        openDao = (dao === undefined);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, 10, 11]);
                        if (!(openDao === true)) return [3 /*break*/, 3];
                        dao = new DAO_1.default();
                        return [4 /*yield*/, dao.openConexao()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        model = ModelManager_1.default.getModel(config.tabela);
                        chaveCampo = model.getChavePrimaria();
                        config.key = 'a';
                        config.criterios = [{ campo: chaveCampo[0], valor: (_a = config.porId) === null || _a === void 0 ? void 0 : _a.id }];
                        dados = new SqlConsulta_1.default().getDadosConsulta(config);
                        return [4 /*yield*/, dao.executarSql(dados.sql)];
                    case 4:
                        rows = _b.sent();
                        if (!config.subConsultas) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._subConsulta(dao, dados.campos, config.subConsultas, rows)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!(rows.length > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, ModelConverter_1.ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows)];
                    case 7:
                        result = _b.sent();
                        return [2 /*return*/, result[0]];
                    case 8: return [2 /*return*/];
                    case 9:
                        error_3 = _b.sent();
                        throw new Error(error_3);
                    case 10:
                        if (openDao === true) {
                            if (dao.isConexaoOpen()) {
                                dao.closeConexao();
                            }
                        }
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    Consulta.prototype.consultaPaginada = function (config, dao) {
        return __awaiter(this, void 0, void 0, function () {
            var openDao, totalReg, dados, rows, rowsT, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        openDao = (dao === undefined);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, 9, 10]);
                        if (!(openDao === true)) return [3 /*break*/, 3];
                        dao = new DAO_1.default();
                        return [4 /*yield*/, dao.openConexao()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        totalReg = 0;
                        dados = new SqlConsulta_1.default().getDadosConsulta(config, true);
                        return [4 /*yield*/, dao.executarSql(dados.sql)];
                    case 4:
                        rows = _a.sent();
                        if (!(rows.length > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, dao.executarSql(dados.sqlTotal)];
                    case 5:
                        rowsT = _a.sent();
                        totalReg = parseInt(rowsT[0].TOTAL, 0);
                        _a.label = 6;
                    case 6: return [4 /*yield*/, ModelConverter_1.ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows)];
                    case 7:
                        data = _a.sent();
                        return [2 /*return*/, { totalReg: totalReg, data: data }];
                    case 8:
                        error_4 = _a.sent();
                        throw new Error(error_4);
                    case 9:
                        if (openDao === true) {
                            if (dao.isConexaoOpen()) {
                                dao.closeConexao();
                            }
                        }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Consulta.prototype._subConsulta = function (dao, campos, subConsultas, rows) {
        return __awaiter(this, void 0, void 0, function () {
            var subConsultas_1, subConsultas_1_1, cs, rows_1, rows_1_1, row, subConfig, dadosSub, rowsSub, _a, _b, e_2_1, e_3_1;
            var e_3, _c, e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 12, 13, 14]);
                        subConsultas_1 = __values(subConsultas), subConsultas_1_1 = subConsultas_1.next();
                        _e.label = 1;
                    case 1:
                        if (!!subConsultas_1_1.done) return [3 /*break*/, 11];
                        cs = subConsultas_1_1.value;
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 8, 9, 10]);
                        rows_1 = (e_2 = void 0, __values(rows)), rows_1_1 = rows_1.next();
                        _e.label = 3;
                    case 3:
                        if (!!rows_1_1.done) return [3 /*break*/, 7];
                        row = rows_1_1.value;
                        subConfig = { link: cs.link, campos: campos, row: row };
                        dadosSub = new SqlConsulta_1.default().getDadosConsulta(cs, false, subConfig);
                        return [4 /*yield*/, dao.executarSql(dadosSub.sql)];
                    case 4:
                        rowsSub = _e.sent();
                        _a = row;
                        _b = cs.key;
                        return [4 /*yield*/, ModelConverter_1.ModelConverter.criarModelConsulta(dadosSub.configs, dadosSub.campos, rowsSub)];
                    case 5:
                        _a[_b] = _e.sent();
                        _e.label = 6;
                    case 6:
                        rows_1_1 = rows_1.next();
                        return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (rows_1_1 && !rows_1_1.done && (_d = rows_1.return)) _d.call(rows_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        subConsultas_1_1 = subConsultas_1.next();
                        return [3 /*break*/, 1];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (subConsultas_1_1 && !subConsultas_1_1.done && (_c = subConsultas_1.return)) _c.call(subConsultas_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return Consulta;
}());
exports.default = Consulta;

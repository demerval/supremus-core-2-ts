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
var enums_1 = require("../enums");
var DAO_1 = __importDefault(require("../database/DAO"));
var ModelManager_1 = __importDefault(require("./ModelManager"));
var ModelInsert_1 = require("./auxx/ModelInsert");
var ModelUpdate_1 = require("./auxx/ModelUpdate");
var ModelDelete_1 = require("./auxx/ModelDelete");
var Consulta_1 = __importDefault(require("../sql/Consulta"));
var ModelPersiste = /** @class */ (function () {
    function ModelPersiste() {
    }
    ModelPersiste.prototype.persistir = function (config, dao) {
        return __awaiter(this, void 0, void 0, function () {
            var openDao, result, _a, _b, c, model, dados, dados_1, dados_1_1, d, c_1, _c, itemInsert, itemUpdate, itemDelete, e_1_1, _d, _e, configConsulta, idConsulta, _f, _g, e_2_1, error_1;
            var e_1, _h, e_3, _j, e_2, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        openDao = (dao === undefined);
                        _l.label = 1;
                    case 1:
                        _l.trys.push([1, 28, 29, 30]);
                        if (!(openDao === true)) return [3 /*break*/, 3];
                        dao = new DAO_1.default();
                        return [4 /*yield*/, dao.openConexao(true)];
                    case 2:
                        _l.sent();
                        _l.label = 3;
                    case 3:
                        result = {};
                        _l.label = 4;
                    case 4:
                        _l.trys.push([4, 15, 16, 17]);
                        _a = __values(config.persistir), _b = _a.next();
                        _l.label = 5;
                    case 5:
                        if (!!_b.done) return [3 /*break*/, 14];
                        c = _b.value;
                        model = ModelManager_1.default.getModel(c.id);
                        dados = model.getDados(c.dados);
                        try {
                            for (dados_1 = (e_3 = void 0, __values(dados)), dados_1_1 = dados_1.next(); !dados_1_1.done; dados_1_1 = dados_1.next()) {
                                d = dados_1_1.value;
                                if (d[2] instanceof Array) {
                                    c_1 = d[2];
                                    d[2] = result[c_1[0]][c_1[1]];
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (dados_1_1 && !dados_1_1.done && (_j = dados_1.return)) _j.call(dados_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        _c = c.status;
                        switch (_c) {
                            case enums_1.Status.INSERT: return [3 /*break*/, 6];
                            case enums_1.Status.UPDATE: return [3 /*break*/, 8];
                            case enums_1.Status.DELETE: return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 12];
                    case 6: return [4 /*yield*/, ModelInsert_1.ModelInsert.persiste(dao, model, dados)];
                    case 7:
                        itemInsert = _l.sent();
                        result[c.id] = itemInsert;
                        return [3 /*break*/, 13];
                    case 8: return [4 /*yield*/, ModelUpdate_1.ModelUpdate.persiste(dao, model, dados)];
                    case 9:
                        itemUpdate = _l.sent();
                        result[c.id] = itemUpdate;
                        return [3 /*break*/, 13];
                    case 10: return [4 /*yield*/, ModelDelete_1.ModelDelete.persiste(dao, model, dados)];
                    case 11:
                        itemDelete = _l.sent();
                        result[c.id] = itemDelete;
                        return [3 /*break*/, 13];
                    case 12: throw new Error('Status inválido.');
                    case 13:
                        _b = _a.next();
                        return [3 /*break*/, 5];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        e_1_1 = _l.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 16:
                        try {
                            if (_b && !_b.done && (_h = _a.return)) _h.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 17:
                        if (!config.consultar) return [3 /*break*/, 25];
                        _l.label = 18;
                    case 18:
                        _l.trys.push([18, 23, 24, 25]);
                        _d = __values(config.consultar), _e = _d.next();
                        _l.label = 19;
                    case 19:
                        if (!!_e.done) return [3 /*break*/, 22];
                        configConsulta = _e.value;
                        idConsulta = configConsulta.idConsulta;
                        if (idConsulta) {
                            if (configConsulta.criterios === undefined) {
                                configConsulta.criterios = [];
                            }
                            configConsulta.criterios.push({ campo: idConsulta.campo, valor: result[idConsulta.campoResult[0]][idConsulta.campoResult[1]] });
                        }
                        _f = result;
                        _g = configConsulta.key;
                        return [4 /*yield*/, new Consulta_1.default().consultar(configConsulta, dao)];
                    case 20:
                        _f[_g] = _l.sent();
                        _l.label = 21;
                    case 21:
                        _e = _d.next();
                        return [3 /*break*/, 19];
                    case 22: return [3 /*break*/, 25];
                    case 23:
                        e_2_1 = _l.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 25];
                    case 24:
                        try {
                            if (_e && !_e.done && (_k = _d.return)) _k.call(_d);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 25:
                        if (!(openDao === true)) return [3 /*break*/, 27];
                        return [4 /*yield*/, dao.confirmarTransacao()];
                    case 26:
                        _l.sent();
                        _l.label = 27;
                    case 27: return [2 /*return*/, result];
                    case 28:
                        error_1 = _l.sent();
                        throw new Error(error_1);
                    case 29:
                        if (openDao === true) {
                            if (dao.isConexaoOpen()) {
                                dao.closeConexao();
                            }
                        }
                        return [7 /*endfinally*/];
                    case 30: return [2 /*return*/];
                }
            });
        });
    };
    return ModelPersiste;
}());
exports.default = ModelPersiste;

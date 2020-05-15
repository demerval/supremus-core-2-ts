"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
var moment_1 = __importDefault(require("moment"));
var ModelManager_1 = __importDefault(require("../ModelManager"));
exports.ModelConverter = {
    criarModel: function (dados) {
        return __awaiter(this, void 0, void 0, function () {
            var item, dados_1, dados_1_1, d;
            var e_1, _a;
            return __generator(this, function (_b) {
                item = {};
                try {
                    for (dados_1 = __values(dados), dados_1_1 = dados_1.next(); !dados_1_1.done; dados_1_1 = dados_1.next()) {
                        d = dados_1_1.value;
                        item[d[0]] = getValor(d[5], d[2]);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (dados_1_1 && !dados_1_1.done && (_a = dados_1.return)) _a.call(dados_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/, item];
            });
        });
    },
    criarModelConsulta: function (configs, dados, rows) {
        return __awaiter(this, void 0, void 0, function () {
            var key1, model, itens, map, dados_2, dados_2_1, d, d2, _loop_1, rows_1, rows_1_1, r, e_2_1;
            var e_3, _a, _b, _c, e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        key1 = configs.keys().next().value;
                        model = ModelManager_1.default.getModel(configs.get(key1).tabela);
                        itens = [];
                        map = {};
                        try {
                            for (dados_2 = __values(dados), dados_2_1 = dados_2.next(); !dados_2_1.done; dados_2_1 = dados_2.next()) {
                                d = dados_2_1.value;
                                d2 = d.alias.toUpperCase();
                                if (d.funcao !== undefined) {
                                    map[d2] = { nome: d.alias, tipo: d.tipo, funcao: true };
                                }
                                if (d.keyTabela !== key1) {
                                    if (map[d.keyTabela]) {
                                        map[d.keyTabela] = __assign(__assign({}, map[d.keyTabela]), (_b = {}, _b[d2] = { nome: d.keyCampo, tipo: d.tipo, funcao: false }, _b));
                                    }
                                    else {
                                        map[d.keyTabela] = (_c = {}, _c[d2] = { nome: d.keyCampo, tipo: d.tipo, funcao: false }, _c);
                                    }
                                }
                                else {
                                    map[d2] = { nome: d.keyCampo, tipo: d.tipo, funcao: false };
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (dados_2_1 && !dados_2_1.done && (_a = dados_2.return)) _a.call(dados_2);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        _loop_1 = function (r) {
                            var item;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        item = {};
                                        Object.getOwnPropertyNames(r).forEach(function (name) {
                                            var _a, _b;
                                            var s = name.split('_');
                                            var s0 = s[0].toLowerCase();
                                            var valor = r[name];
                                            if (map[name] !== undefined && map[name].funcao === true) {
                                                item[map[name].nome] = getValor(map[name].tipo, valor);
                                            }
                                            else if (s0 === key1) {
                                                item[map[name].nome] = getValor(map[name].tipo, valor);
                                            }
                                            else {
                                                if (map[s0] === undefined) {
                                                    item[name] = valor;
                                                }
                                                else if (item[s0]) {
                                                    item[s0] = __assign(__assign({}, item[s0]), (_a = {}, _a[map[s0][name].nome] = getValor(map[s0][name].tipo, valor), _a));
                                                }
                                                else {
                                                    item[s0] = (_b = {}, _b[map[s0][name].nome] = getValor(map[s0][name].tipo, valor), _b);
                                                }
                                            }
                                        });
                                        return [4 /*yield*/, model.onDadosCarregado(item)];
                                    case 1:
                                        _a.sent();
                                        itens.push(item);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        rows_1 = __values(rows), rows_1_1 = rows_1.next();
                        _e.label = 2;
                    case 2:
                        if (!!rows_1_1.done) return [3 /*break*/, 5];
                        r = rows_1_1.value;
                        return [5 /*yield**/, _loop_1(r)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        rows_1_1 = rows_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (rows_1_1 && !rows_1_1.done && (_d = rows_1.return)) _d.call(rows_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, itens];
                }
            });
        });
    }
};
function getValor(tipo, valor) {
    if (tipo === supremus_core_2_ts_base_1.Enums.FieldType.DATE) {
        if (valor === undefined || valor === null) {
            return '';
        }
        else {
            return moment_1.default(valor, 'YYYY-MM-DD').format('DD/MM/YYYY');
        }
    }
    if (tipo === supremus_core_2_ts_base_1.Enums.FieldType.BOOLEAN) {
        if (valor === undefined || valor === null) {
            return false;
        }
        else {
            var intValue = parseInt(valor, 10);
            return (intValue === 1);
        }
    }
    return valor;
}

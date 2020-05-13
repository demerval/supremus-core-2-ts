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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DAO_1 = __importDefault(require("../database/DAO"));
var ChaveEstrangeiraUtil_1 = require("./auxx/ChaveEstrangeiraUtil");
var EstruturaUtil_1 = __importDefault(require("./auxx/EstruturaUtil"));
var TabelaUtil_1 = require("./auxx/TabelaUtil");
var TabelaAjustar_1 = __importDefault(require("./auxx/TabelaAjustar"));
var TabelaCriar_1 = require("./auxx/TabelaCriar");
var ModelManager_1 = __importDefault(require("../model/ModelManager"));
var EstruturaVerificar = /** @class */ (function () {
    function EstruturaVerificar() {
        this.dao = new DAO_1.default();
    }
    EstruturaVerificar.prototype.verificar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var models, chavesEstrangeiras, models_1, models_1_1, model, config, e_1_1, error_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, 14, 15]);
                        return [4 /*yield*/, this.dao.openConexao()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this._verificarTabelasUpdate()];
                    case 2:
                        _b.sent();
                        models = ModelManager_1.default.getModels();
                        chavesEstrangeiras = [];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, 9, 10]);
                        models_1 = __values(models), models_1_1 = models_1.next();
                        _b.label = 4;
                    case 4:
                        if (!!models_1_1.done) return [3 /*break*/, 7];
                        model = models_1_1.value;
                        if (model.isVerificar() === false) {
                            return [3 /*break*/, 6];
                        }
                        if (model.getNome() === 'updateVersao') {
                            return [3 /*break*/, 6];
                        }
                        config = new EstruturaUtil_1.default().prepare(model);
                        if (config.configChaveEstrangeira.length > 0) {
                            chavesEstrangeiras.push.apply(chavesEstrangeiras, __spread(config.configChaveEstrangeira));
                        }
                        return [4 /*yield*/, this._executarVerificacao(config)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        models_1_1 = models_1.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (models_1_1 && !models_1_1.done && (_a = models_1.return)) _a.call(models_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        if (!(chavesEstrangeiras.length > 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, ChaveEstrangeiraUtil_1.ChaveEstrangeiraUtil.criar(this.dao, chavesEstrangeiras)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        error_1 = _b.sent();
                        throw new Error(typeof error_1 === 'string' ? error_1 : error_1.message);
                    case 14:
                        if (this.dao.isConexaoOpen()) {
                            this.dao.closeConexao();
                        }
                        return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    EstruturaVerificar.prototype._verificarTabelasUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modelEstruturaVersao, configEstruturaVersao, modelUpdateVersao, configUpdateVersao;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelEstruturaVersao = require('../base/models/EstruturaVersaoModel').default;
                        configEstruturaVersao = new EstruturaUtil_1.default().prepare(modelEstruturaVersao);
                        return [4 /*yield*/, this._executarVerificacao(configEstruturaVersao)];
                    case 1:
                        _a.sent();
                        modelUpdateVersao = require('../base/models/UpdateVersaoModel').default;
                        configUpdateVersao = new EstruturaUtil_1.default().prepare(modelUpdateVersao);
                        return [4 /*yield*/, this._executarVerificacao(configUpdateVersao)];
                    case 2:
                        _a.sent();
                        ModelManager_1.default.addModel(modelUpdateVersao);
                        return [2 /*return*/];
                }
            });
        });
    };
    EstruturaVerificar.prototype._executarVerificacao = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var existe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TabelaUtil_1.TabelaUtil.tabelaExiste(this.dao, config.nomeTabela)];
                    case 1:
                        existe = _a.sent();
                        if (!(existe === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, TabelaAjustar_1.default.verificarTabela(this.dao, config)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, TabelaCriar_1.TabelaCriar.criar(this.dao, config)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return EstruturaVerificar;
}());
exports.default = EstruturaVerificar;

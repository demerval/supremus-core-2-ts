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
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model(nome, nomeTabela, campos, versao, verificar) {
        if (versao === void 0) { versao = 1; }
        if (verificar === void 0) { verificar = true; }
        this.nome = nome.toLowerCase();
        this.nomeTabela = nomeTabela.toUpperCase();
        this.campos = campos;
        this.versao = versao;
        this.verificar = verificar;
    }
    Model.prototype.isVerificar = function () {
        return this.verificar;
    };
    Model.prototype.getNome = function () {
        return this.nome;
    };
    Model.prototype.getNomeTabela = function () {
        return this.nomeTabela;
    };
    Model.prototype.getCampos = function () {
        return this.campos;
    };
    Model.prototype.getCampo = function (nome) {
        return this.campos.get(nome);
    };
    Model.prototype.getVersao = function () {
        return this.versao;
    };
    Model.prototype.getChavePrimaria = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.campos), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (value.isChavePrimaria()) {
                    return [key, value];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new Error('Chave primaria não localizada.');
    };
    Model.prototype.getDados = function (dados) {
        var _this = this;
        var config = [];
        Object.getOwnPropertyNames(dados).forEach(function (key) {
            var campo = _this.campos.get(key);
            if (campo !== undefined) {
                var c = campo.getDados(dados[key], key);
                config.push(c);
            }
        });
        return config;
    };
    Model.prototype.getCamposConsulta = function (key, campos) {
        var e_2, _a, e_3, _b;
        var camposConsulta = [];
        if (campos === undefined) {
            try {
                for (var _c = __values(this.campos), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), k = _e[0], c = _e[1];
                    camposConsulta.push([key, c.getNome(), key + "_" + c.getNome(), k, c.getTipo()]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            try {
                for (var campos_1 = __values(campos), campos_1_1 = campos_1.next(); !campos_1_1.done; campos_1_1 = campos_1.next()) {
                    var c = campos_1_1.value;
                    var campo = this.getCampo(c);
                    if (campo === undefined) {
                        throw new Error("O campo " + c + " n\u00E3o foi localizado.");
                    }
                    camposConsulta.push([key, campo.getNome(), key + "_" + campo.getNome(), c, campo.getTipo()]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (campos_1_1 && !campos_1_1.done && (_b = campos_1.return)) _b.call(campos_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return camposConsulta;
    };
    Model.prototype.onEstruturaVerificada = function (dao) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ;
    Model.prototype.onDadosCarregado = function (item) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    Model.prototype.onAntesPersistir = function (dao, item, status) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    Model.prototype.onDepoisPersistir = function (dao, item, status) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return Model;
}());
exports.default = Model;

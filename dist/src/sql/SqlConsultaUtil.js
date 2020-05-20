"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModelManager_1 = __importDefault(require("../model/ModelManager"));
var operadores = ["=", ">", "<", "<>", ">=", "<=", "LIKE", "BETWEEN"];
var ordenadores = ["ASC", "DESC"];
var SqlConsultaUtil = /** @class */ (function () {
    function SqlConsultaUtil() {
    }
    SqlConsultaUtil.prototype.getCriterio = function (configs) {
        var e_1, _a, e_2, _b, e_3, _c;
        var criterioConsulta = [];
        try {
            for (var configs_1 = __values(configs), configs_1_1 = configs_1.next(); !configs_1_1.done; configs_1_1 = configs_1.next()) {
                var _d = __read(configs_1_1.value, 2), key = _d[0], config = _d[1];
                var criterios = config.criterios;
                if (criterios === undefined) {
                    continue;
                }
                var model = ModelManager_1.default.getModel(config.tabela);
                try {
                    for (var criterios_1 = (e_2 = void 0, __values(criterios)), criterios_1_1 = criterios_1.next(); !criterios_1_1.done; criterios_1_1 = criterios_1.next()) {
                        var c = criterios_1_1.value;
                        if (c instanceof Array) {
                            var crs = ["("];
                            var comparador = "";
                            try {
                                for (var c_1 = (e_3 = void 0, __values(c)), c_1_1 = c_1.next(); !c_1_1.done; c_1_1 = c_1.next()) {
                                    var cr = c_1_1.value;
                                    comparador = cr.comparador ? cr.comparador.toUpperCase() : "AND";
                                    var crr = this.getDadosCriterio(key, model, cr);
                                    crs.push(crr);
                                    crs.push(comparador);
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (c_1_1 && !c_1_1.done && (_c = c_1.return)) _c.call(c_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            crs.pop();
                            crs.push(")");
                            //crs.push(comparador);
                            criterioConsulta.push(crs.join(" "), comparador);
                        }
                        else {
                            var cr = this.getDadosCriterio(key, model, c);
                            criterioConsulta.push(cr);
                            criterioConsulta.push(c.comparador ? c.comparador.toUpperCase() : "AND");
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (criterios_1_1 && !criterios_1_1.done && (_b = criterios_1.return)) _b.call(criterios_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (configs_1_1 && !configs_1_1.done && (_a = configs_1.return)) _a.call(configs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (criterioConsulta.length === 0) {
            return undefined;
        }
        criterioConsulta.pop();
        return criterioConsulta.join(" ");
    };
    SqlConsultaUtil.prototype.getDadosCriterio = function (key, model, criterio) {
        var campo = model.getCampo(criterio.campo);
        if (campo === undefined) {
            throw new Error("O campo " + criterio.campo + " n\u00E3o foi localizado.");
        }
        var cop = criterio.operador || "=";
        var operador = operadores.find(function (op) { return op === cop.toUpperCase(); });
        if (operador === undefined) {
            throw new Error("Operador n\u00E3o localizado " + criterio.operador + ": " + JSON.stringify(criterio));
        }
        var valores = [];
        if (criterio.valor instanceof Array) {
            operador = "BETWEEN";
            valores.push(campo.getValorSql(criterio.valor[0]));
            valores.push("AND");
            valores.push(campo.getValorSql(criterio.valor[1]));
        }
        else {
            valores.push(campo.getValorSql(criterio.valor));
        }
        return key + "." + campo.getNome() + " " + operador + " " + valores.join(" ");
    };
    SqlConsultaUtil.prototype.getDadosOrdem = function (configs, ordem) {
        var e_4, _a;
        if (ordem === undefined) {
            return undefined;
        }
        var key1 = configs.keys().next().value;
        var ordens = [];
        var _loop_1 = function (ord) {
            var s = ord.split(" ");
            var op = s[1];
            var key = key1;
            var nome = s[0];
            if (s[0].indexOf('.') > -1) {
                var s2 = s[0].split('.');
                key = s2[0];
                nome = s2[1];
            }
            var model = ModelManager_1.default.getModel(configs.get(key).tabela);
            var campo = model.getCampo(nome);
            if (campo === undefined) {
                throw new Error("O campo " + nome + " n\u00E3o foi localizado.");
            }
            if (op === undefined) {
                ordens.push(key + "." + campo.getNome());
            }
            else {
                var operador = ordenadores.find(function (u) { return u === op.toUpperCase(); });
                if (operador === undefined) {
                    throw new Error("Ordenador " + s[1] + " n\u00E3o foi localizado. " + ord);
                }
                ordens.push(key + "." + campo.getNome() + " " + operador);
            }
        };
        try {
            for (var ordem_1 = __values(ordem), ordem_1_1 = ordem_1.next(); !ordem_1_1.done; ordem_1_1 = ordem_1.next()) {
                var ord = ordem_1_1.value;
                _loop_1(ord);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (ordem_1_1 && !ordem_1_1.done && (_a = ordem_1.return)) _a.call(ordem_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return ordens.join(", ");
    };
    return SqlConsultaUtil;
}());
exports.default = SqlConsultaUtil;

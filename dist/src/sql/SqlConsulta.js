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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SqlConsultaUtil_1 = __importDefault(require("./SqlConsultaUtil"));
var ModelManager_1 = __importDefault(require("../model/ModelManager"));
var SqlConsulta = /** @class */ (function () {
    function SqlConsulta() {
        this.sqlUtil = new SqlConsultaUtil_1.default();
        this.configs = new Map();
    }
    SqlConsulta.prototype.getDadosConsulta = function (config, isPaginado, subConsulta) {
        if (isPaginado === void 0) { isPaginado = false; }
        var _a, _b, _c;
        var paginado = isPaginado === true ? "FIRST " + ((_a = config.paginado) === null || _a === void 0 ? void 0 : _a.qtdeRegistros) + " SKIP " + ((_b = config.paginado) === null || _b === void 0 ? void 0 : _b.pagina) * ((_c = config.paginado) === null || _c === void 0 ? void 0 : _c.qtdeRegistros) + " " : '';
        var dados = this.getDados(config, subConsulta);
        var campos = dados.campos.map(function (c) { return c[0] + "." + c[1] + " AS " + c[2]; });
        var sql = "SELECT " + paginado + campos.join(', ') + " FROM " + dados.tabela;
        if (dados.joins) {
            sql += " " + dados.joins.join(' ');
        }
        if (dados.criterio) {
            sql += " WHERE " + dados.criterio;
        }
        if (dados.ordem) {
            sql += " ORDER BY " + dados.ordem;
        }
        var sqlTotal = undefined;
        if (isPaginado === true) {
            var model = ModelManager_1.default.getModel(config.tabela);
            var campoChave = model.getChavePrimaria();
            sqlTotal = "SELECT COUNT(" + config.key + "." + campoChave[1].getNome() + ") AS TOTAL FROM " + dados.tabela;
            if (dados.joins) {
                sqlTotal += " " + dados.joins.join(' ');
            }
            if (dados.criterio) {
                sqlTotal += " WHERE " + dados.criterio;
            }
            sqlTotal = sqlTotal.toUpperCase();
        }
        return {
            configs: this.configs,
            campos: dados.campos,
            sql: sql.toUpperCase(),
            sqlTotal: sqlTotal,
        };
    };
    SqlConsulta.prototype.getDados = function (config, subConsulta) {
        var e_1, _a;
        this.configs.set(config.key, { tabela: config.tabela.toLowerCase(), criterios: config.criterios });
        var model = ModelManager_1.default.getModel(config.tabela.toLowerCase());
        var campos = model.getCamposConsulta(config.key, config.campos);
        var joins = undefined;
        if (config.joins) {
            joins = [];
            try {
                for (var _b = __values(config.joins), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var join = _c.value;
                    this.configs.set(join.key, { tabela: join.tabela.toLowerCase(), criterios: join.criterios });
                    var dadosJoin = this.getDadosJoin(join);
                    joins.push(dadosJoin.join);
                    campos.push.apply(campos, __spread(dadosJoin.campos));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var criterio = this.sqlUtil.getCriterio(this.configs);
        if (subConsulta !== undefined) {
            if (criterio === undefined) {
                criterio = '';
            }
            criterio += config.key + "." + this._getCampo(subConsulta.link[0], campos) + " = " + this._getValor(subConsulta.link[1], subConsulta);
        }
        var ordem = this.sqlUtil.getDadosOrdem(this.configs, config.ordem);
        return {
            tabela: model.getNomeTabela() + " AS " + config.key,
            campos: campos,
            joins: joins,
            criterio: criterio,
            ordem: ordem
        };
    };
    SqlConsulta.prototype.getDadosJoin = function (config) {
        var model = ModelManager_1.default.getModel(config.tabela.toLowerCase());
        var campos = model.getCamposConsulta(config.key, config.campos);
        var joinTipo = config.joinTipo || 'inner';
        var campo1 = config.key + "." + model.getCampo(config.joinOn[0]).getNome();
        var campo2 = this._getCampoJoin(config.joinOn[1]);
        return {
            join: joinTipo + " join " + model.getNomeTabela() + " AS " + config.key + " on " + campo1 + " = " + campo2,
            campos: campos,
        };
    };
    SqlConsulta.prototype._getCampoJoin = function (campo) {
        var nomeModel = this.configs.get(campo[0]).tabela;
        var model = ModelManager_1.default.getModel(nomeModel);
        var nomeCampo = campo[1];
        var campoModel = model.getCampo(nomeCampo);
        if (campoModel === undefined) {
            throw new Error("O campo " + nomeCampo + " n\u00E3o foi localizado.");
        }
        return campo[0] + "." + campoModel.getNome();
    };
    SqlConsulta.prototype._getCampo = function (key, campos) {
        var campo = campos.find(function (c) { return c[3] === key; });
        if (campo === undefined) {
            throw new Error("O campo " + key + " n\u00E3o foi localizado.");
        }
        return campo[1];
    };
    SqlConsulta.prototype._getValor = function (key, subConsulta) {
        var campo = subConsulta.campos.find(function (d) { return d[3]; });
        if (campo === undefined) {
            throw new Error("O campo " + key + " n\u00E3o foi localizado.");
        }
        return subConsulta.row[campo[2].toUpperCase()];
    };
    return SqlConsulta;
}());
exports.default = SqlConsulta;

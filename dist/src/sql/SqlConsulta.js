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
        var e_1, _a;
        if (isPaginado === void 0) { isPaginado = false; }
        var _b, _c, _d, _e;
        var paginado = isPaginado === true ? "FIRST " + ((_b = config.paginado) === null || _b === void 0 ? void 0 : _b.qtdeRegistros) + " SKIP " + ((_c = config.paginado) === null || _c === void 0 ? void 0 : _c.pagina) * ((_d = config.paginado) === null || _d === void 0 ? void 0 : _d.qtdeRegistros) + " " : '';
        var dados = this.getDados(config, subConsulta);
        var agrupar = dados.dadosCampos.agrupar;
        var camposAgrupar = [];
        var campos = dados.dadosCampos.campos.map(function (c) {
            if (agrupar === true) {
                if (c.funcao !== undefined) {
                    return c.funcao + "(" + c.keyTabela + "." + c.nomeCampo + ") AS " + c.alias;
                }
                camposAgrupar.push(c.keyTabela + "." + c.nomeCampo);
            }
            return c.keyTabela + "." + c.nomeCampo + " AS " + c.alias;
        });
        var sql = "SELECT " + paginado + campos.join(', ') + " FROM " + dados.tabela;
        if (dados.joins) {
            sql += " " + dados.joins.join(' ');
        }
        if (dados.criterio) {
            sql += " WHERE " + dados.criterio;
        }
        if (agrupar === true && camposAgrupar.length > 0) {
            sql += " GROUP BY " + camposAgrupar.join(', ');
        }
        if (dados.ordem) {
            sql += " ORDER BY " + dados.ordem;
        }
        var sqlTotal = undefined;
        if (isPaginado === true) {
            var model = ModelManager_1.default.getModel(config.tabela);
            var campoChave = model.getChavePrimaria();
            var funcoes = ["COUNT(" + config.key + "." + campoChave[1].getNome() + ") AS TOTAL"];
            if ((_e = config.paginado) === null || _e === void 0 ? void 0 : _e.funcoes) {
                try {
                    for (var _f = __values(config.paginado.funcoes), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var fnc = _g.value;
                        var campo = this._getCampoModel(fnc.key, fnc.campo);
                        funcoes.push((fnc.funcao === undefined ? 'SUM' : fnc.funcao) + "(" + fnc.key + "." + campo.getNome() + ") AS " + fnc.alias);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            sqlTotal = "SELECT " + funcoes.join(', ') + " FROM " + dados.tabela;
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
            campos: dados.dadosCampos.campos,
            sql: sql.toUpperCase(),
            sqlTotal: sqlTotal,
        };
    };
    SqlConsulta.prototype.getDados = function (config, subConsulta) {
        var e_2, _a, _b;
        this.configs.set(config.key, { tabela: config.tabela.toLowerCase(), criterios: config.criterios });
        var model = ModelManager_1.default.getModel(config.tabela.toLowerCase());
        var dadosCampos = model.getCamposConsulta(config.key, config.campos);
        var joins = undefined;
        if (config.joins) {
            joins = [];
            try {
                for (var _c = __values(config.joins), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var join = _d.value;
                    this.configs.set(join.key, { tabela: join.tabela.toLowerCase(), criterios: join.criterios });
                    var dadosJoin = this.getDadosJoin(join);
                    joins.push(dadosJoin.join);
                    (_b = dadosCampos.campos).push.apply(_b, __spread(dadosJoin.dadosCampos.campos));
                    if (dadosCampos.agrupar === false && dadosJoin.dadosCampos.agrupar === true) {
                        dadosCampos.agrupar = true;
                    }
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
        var criterio = this.sqlUtil.getCriterio(this.configs);
        if (subConsulta !== undefined) {
            if (criterio === undefined) {
                criterio = '';
            }
            criterio += config.key + "." + this._getCampo(subConsulta.link[0], dadosCampos.campos) + " = " + this._getValor(subConsulta.link[1], subConsulta);
        }
        var ordem = this.sqlUtil.getDadosOrdem(this.configs, config.ordem);
        return {
            tabela: model.getNomeTabela() + " AS " + config.key,
            dadosCampos: dadosCampos,
            joins: joins,
            criterio: criterio,
            ordem: ordem
        };
    };
    SqlConsulta.prototype.getDadosJoin = function (config) {
        var model = ModelManager_1.default.getModel(config.tabela.toLowerCase());
        var dadosCampos = model.getCamposConsulta(config.key, config.campos);
        var joinTipo = config.joinTipo || 'inner';
        var campo1 = config.key + "." + model.getCampo(config.joinOn[0]).getNome();
        var campo2 = this._getCampoJoin(config.joinOn[1]);
        return {
            join: joinTipo + " join " + model.getNomeTabela() + " AS " + config.key + " on " + campo1 + " = " + campo2,
            dadosCampos: dadosCampos,
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
        var campo = campos.find(function (c) { return c.keyCampo === key; });
        if (campo === undefined) {
            throw new Error("O campo " + key + " n\u00E3o foi localizado.");
        }
        return campo.nomeCampo;
    };
    SqlConsulta.prototype._getValor = function (key, subConsulta) {
        var campo = subConsulta.campos.find(function (d) { return d.keyCampo === key; });
        if (campo === undefined) {
            throw new Error("O campo " + key + " n\u00E3o foi localizado.");
        }
        return subConsulta.row[campo.nomeCampo.toUpperCase()];
    };
    SqlConsulta.prototype._getCampoModel = function (key, nomeCampo) {
        var config = this.configs.get(key);
        if (config === undefined) {
            throw new Error("N\u00E3o foi localizada a tabela pelo key: " + key);
        }
        var model = ModelManager_1.default.getModel(config.tabela);
        if (model === undefined) {
            throw new Error("N\u00E3o foi localizada a tabela: " + config.tabela);
        }
        var campo = model.getCampo(nomeCampo);
        if (campo === undefined) {
            throw new Error("N\u00E3o foi localizado o campo: " + nomeCampo + " na tabela: " + config.tabela);
        }
        return campo;
    };
    return SqlConsulta;
}());
exports.default = SqlConsulta;

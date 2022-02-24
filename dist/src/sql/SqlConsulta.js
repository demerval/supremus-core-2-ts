"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqlConsultaUtil_1 = __importDefault(require("./SqlConsultaUtil"));
const ModelManager_1 = __importDefault(require("../model/ModelManager"));
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
class SqlConsulta {
    constructor() {
        this.sqlUtil = new SqlConsultaUtil_1.default();
        this.configs = new Map();
    }
    getDadosConsulta(config, isPaginado = false, subConsulta) {
        var _a, _b, _c, _d;
        try {
            let paginado = isPaginado === true
                ? `FIRST ${(_a = config.paginado) === null || _a === void 0 ? void 0 : _a.qtdeRegistros} SKIP ${((_b = config.paginado) === null || _b === void 0 ? void 0 : _b.pagina) * ((_c = config.paginado) === null || _c === void 0 ? void 0 : _c.qtdeRegistros)} `
                : '';
            const dados = this.getDados(config, subConsulta);
            const agrupar = dados.dadosCampos.agrupar;
            const camposAgrupar = [];
            const campos = dados.dadosCampos.campos.map(c => {
                if (agrupar === true) {
                    if (c.funcao !== undefined) {
                        return `${c.funcao}(${c.keyTabela}.${c.nomeCampo}) AS ${c.alias}`;
                    }
                    if (c.tipo === supremus_core_2_ts_base_1.Enums.FieldType.BLOB) {
                        camposAgrupar.push(`CAST(${c.keyTabela}.${c.nomeCampo} AS VARCHAR(6144))`);
                    }
                    else {
                        camposAgrupar.push(`${c.keyTabela}.${c.nomeCampo}`);
                    }
                }
                if (c.tipo === supremus_core_2_ts_base_1.Enums.FieldType.BLOB) {
                    return `CAST (${c.keyTabela}.${c.nomeCampo} AS VARCHAR(6144)) AS ${c.alias}`;
                }
                return `${c.keyTabela}.${c.nomeCampo} AS ${c.alias}`;
            });
            let sql = `SELECT ${paginado}${campos.join(', ')} FROM ${dados.tabela}`;
            if (dados.joins) {
                sql += ` ${dados.joins.join(' ')}`;
            }
            if (dados.criterio) {
                sql += ` WHERE ${dados.criterio}`;
            }
            if (agrupar === true && camposAgrupar.length > 0) {
                sql += ` GROUP BY ${camposAgrupar.join(', ')}`;
            }
            if (dados.ordem) {
                sql += ` ORDER BY ${dados.ordem}`;
            }
            let sqlTotal = undefined;
            if (isPaginado === true) {
                const model = ModelManager_1.default.getModel(config.tabela);
                const campoChave = model.getChavePrimaria();
                const funcoes = [`COUNT(${config.key}.${campoChave[1].getNome()}) AS TOTAL`];
                if ((_d = config.paginado) === null || _d === void 0 ? void 0 : _d.funcoes) {
                    for (let fnc of config.paginado.funcoes) {
                        const campo = this._getCampoModel(fnc.key, fnc.campo);
                        funcoes.push(`${fnc.funcao === undefined ? 'SUM' : fnc.funcao}(${fnc.key}.${campo.getNome()}) AS ${fnc.alias}`);
                    }
                }
                sqlTotal = `SELECT ${funcoes.join(', ')} FROM ${dados.tabela}`;
                if (dados.joins) {
                    sqlTotal += ` ${dados.joins.join(' ')}`;
                }
                if (dados.criterio) {
                    sqlTotal += ` WHERE ${dados.criterio}`;
                }
                sqlTotal = sqlTotal.toUpperCase();
            }
            return {
                configs: this.configs,
                campos: dados.dadosCampos.campos,
                sql: sql.toUpperCase(),
                sqlTotal,
            };
        }
        catch (error) {
            throw error;
        }
    }
    getDados(config, subConsulta) {
        this.configs.set(config.key, { tabela: config.tabela.toLowerCase(), criterios: config.criterios });
        const model = ModelManager_1.default.getModel(config.tabela.toLowerCase());
        const dadosCampos = model.getCamposConsulta(config.key, config.campos);
        let joins = undefined;
        if (config.joins) {
            joins = [];
            for (let join of config.joins) {
                this.configs.set(join.key, { tabela: join.tabela.toLowerCase(), criterios: join.criterios });
                const dadosJoin = this.getDadosJoin(join);
                joins.push(dadosJoin.join);
                dadosCampos.campos.push(...dadosJoin.dadosCampos.campos);
                if (dadosCampos.agrupar === false && dadosJoin.dadosCampos.agrupar === true) {
                    dadosCampos.agrupar = true;
                }
            }
        }
        let criterio = this.sqlUtil.getCriterio(this.configs);
        if (subConsulta !== undefined) {
            if (criterio === undefined) {
                criterio = '';
            }
            criterio += `${config.key}.${this._getCampo(subConsulta.link[0], dadosCampos.campos)} = '${this._getValor(subConsulta.link[1], subConsulta)}'`;
        }
        const ordem = this.sqlUtil.getDadosOrdem(this.configs, config.ordem);
        return {
            tabela: `${model.getNomeTabela()} AS ${config.key}`,
            dadosCampos,
            joins,
            criterio,
            ordem,
        };
    }
    getDadosJoin(config) {
        const model = ModelManager_1.default.getModel(config.tabela.toLowerCase());
        const dadosCampos = model.getCamposConsulta(config.key, config.campos);
        const joinTipo = config.joinTipo || 'inner';
        const campo1 = `${config.key}.${model.getCampo(config.joinOn[0]).getNome()}`;
        const campo2 = this._getCampoJoin(config.joinOn[1]);
        return {
            join: `${joinTipo} join ${model.getNomeTabela()} AS ${config.key} on ${campo1} = ${campo2}`,
            dadosCampos,
        };
    }
    _getCampoJoin(campo) {
        const nomeModel = this.configs.get(campo[0]).tabela;
        const model = ModelManager_1.default.getModel(nomeModel);
        const nomeCampo = campo[1];
        const campoModel = model.getCampo(nomeCampo);
        if (campoModel === undefined) {
            throw new Error(`O campo ${nomeCampo} não foi localizado.`);
        }
        return `${campo[0]}.${campoModel.getNome()}`;
    }
    _getCampo(key, campos) {
        const campo = campos.find(c => c.keyCampo === key);
        if (campo === undefined) {
            throw new Error(`O campo ${key} não foi localizado.`);
        }
        return campo.nomeCampo;
    }
    _getValor(key, subConsulta) {
        const campo = subConsulta.campos.find(d => d.keyCampo === key);
        if (campo === undefined) {
            throw new Error(`O campo ${key} não foi localizado.`);
        }
        return subConsulta.row[campo.alias.toUpperCase()];
    }
    _getCampoModel(key, nomeCampo) {
        const config = this.configs.get(key);
        if (config === undefined) {
            throw new Error(`Não foi localizada a tabela pelo key: ${key}`);
        }
        const model = ModelManager_1.default.getModel(config.tabela);
        if (model === undefined) {
            throw new Error(`Não foi localizada a tabela: ${config.tabela}`);
        }
        const campo = model.getCampo(nomeCampo);
        if (campo === undefined) {
            throw new Error(`Não foi localizado o campo: ${nomeCampo} na tabela: ${config.tabela}`);
        }
        return campo;
    }
}
exports.default = SqlConsulta;

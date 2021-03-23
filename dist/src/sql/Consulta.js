"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("../database/DAO"));
const SqlConsulta_1 = __importDefault(require("./SqlConsulta"));
const ModelConverter_1 = require("../model/auxx/ModelConverter");
const ModelManager_1 = __importDefault(require("../model/ModelManager"));
class Consulta {
    async consultar(config, dao) {
        let openDao = dao === undefined;
        try {
            if (openDao === true) {
                dao = new DAO_1.default();
                await dao.openConexao();
            }
            if (config instanceof Array) {
                throw new Error('Consulta padrao não pode ser um array.');
            }
            const dados = new SqlConsulta_1.default().getDadosConsulta(config);
            let rows = await dao.executarSql(dados.sql);
            if (config.subConsultas) {
                await this._subConsulta(dao, dados.campos, config.subConsultas, rows);
            }
            return await ModelConverter_1.ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
        }
        catch (error) {
            throw error;
        }
        finally {
            if (openDao === true) {
                if (dao.isConexaoOpen()) {
                    dao.closeConexao();
                }
            }
        }
    }
    async consultarArray(config, dao) {
        let openDao = dao === undefined;
        try {
            if (openDao === true) {
                dao = new DAO_1.default();
                await dao.openConexao();
            }
            if (!(config instanceof Array)) {
                throw new Error('Consulta por array precisa ser um array.');
            }
            let rowsResult = {};
            for (let c of config) {
                const dados = new SqlConsulta_1.default().getDadosConsulta(c);
                let rows = await dao.executarSql(dados.sql);
                if (c.subConsultas) {
                    await this._subConsulta(dao, dados.campos, c.subConsultas, rows);
                }
                rowsResult[c.key] = await ModelConverter_1.ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
            }
            return rowsResult;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (openDao === true) {
                if (dao.isConexaoOpen()) {
                    dao.closeConexao();
                }
            }
        }
    }
    async consultarPorId(config, dao) {
        var _a;
        let openDao = dao === undefined;
        if (config.porId === undefined) {
            throw new Error('Erro na configuração da consulta porId.');
        }
        try {
            if (openDao === true) {
                dao = new DAO_1.default();
                await dao.openConexao();
            }
            const model = ModelManager_1.default.getModel(config.tabela);
            const chaveCampo = model.getChavePrimaria();
            config.criterios = [{ campo: chaveCampo[0], valor: (_a = config.porId) === null || _a === void 0 ? void 0 : _a.id }];
            const dados = new SqlConsulta_1.default().getDadosConsulta(config);
            let rows = await dao.executarSql(dados.sql);
            if (config.subConsultas) {
                await this._subConsulta(dao, dados.campos, config.subConsultas, rows);
            }
            if (rows.length > 0) {
                const result = await ModelConverter_1.ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
                return result[0];
            }
            return;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (openDao === true) {
                if (dao.isConexaoOpen()) {
                    dao.closeConexao();
                }
            }
        }
    }
    async consultaPaginada(config, dao) {
        let openDao = dao === undefined;
        if (config.paginado === undefined) {
            throw new Error('Erro na configuração da consulta paginada.');
        }
        try {
            if (openDao === true) {
                dao = new DAO_1.default();
                await dao.openConexao();
            }
            let totalReg = 0;
            const resultFuncoes = [];
            const dados = new SqlConsulta_1.default().getDadosConsulta(config, true);
            const rows = await dao.executarSql(dados.sql);
            if (rows.length > 0) {
                let rowsT = await dao.executarSql(dados.sqlTotal);
                const row = rowsT[0];
                totalReg = parseInt(row.TOTAL, 0);
                if (config.paginado.funcoes) {
                    for (let fnc of config.paginado.funcoes) {
                        resultFuncoes.push({ [fnc.alias]: row[fnc.alias.toUpperCase()] });
                    }
                }
            }
            const data = await ModelConverter_1.ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
            return { totalReg, data, resultFuncoes };
        }
        catch (error) {
            throw error;
        }
        finally {
            if (openDao === true) {
                if (dao.isConexaoOpen()) {
                    dao.closeConexao();
                }
            }
        }
    }
    async consultarSql(config, dao) {
        let openDao = dao === undefined;
        try {
            if (openDao === true) {
                dao = new DAO_1.default();
                await dao.openConexao();
            }
            let result = {};
            if (config instanceof Array) {
                for (let c of config) {
                    const rows = await (dao === null || dao === void 0 ? void 0 : dao.executarSql(c.sql));
                    result[c.key] = ModelConverter_1.ModelConverter.criarModelConsultaSql(rows);
                }
                return result;
            }
            else {
                const rows = await (dao === null || dao === void 0 ? void 0 : dao.executarSql(config.sql));
                result[config.key] = ModelConverter_1.ModelConverter.criarModelConsultaSql(rows);
            }
            return result;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (openDao === true) {
                if (dao.isConexaoOpen()) {
                    dao.closeConexao();
                }
            }
        }
    }
    async _subConsulta(dao, campos, subConsultas, rows) {
        for (let cs of subConsultas) {
            for (let row of rows) {
                const subConfig = { link: cs.link, campos, row };
                const dadosSub = new SqlConsulta_1.default().getDadosConsulta(cs, false, subConfig);
                const rowsSub = await dao.executarSql(dadosSub.sql);
                row[cs.key] = await ModelConverter_1.ModelConverter.criarModelConsulta(dadosSub.configs, dadosSub.campos, rowsSub);
            }
        }
    }
}
exports.default = Consulta;

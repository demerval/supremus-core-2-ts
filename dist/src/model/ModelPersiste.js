"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("../database/DAO"));
const ModelManager_1 = __importDefault(require("./ModelManager"));
const ModelInsert_1 = require("./auxx/ModelInsert");
const ModelUpdate_1 = require("./auxx/ModelUpdate");
const ModelDelete_1 = require("./auxx/ModelDelete");
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
const Consulta_1 = __importDefault(require("../sql/Consulta"));
const ModelConverter_1 = require("./auxx/ModelConverter");
class ModelPersiste {
    async persistir(config, dao) {
        let openDao = dao === undefined;
        try {
            if (openDao === true) {
                dao = new DAO_1.default();
                await dao.openConexao(true);
            }
            let result = {};
            for (let c of config.persistir) {
                const model = ModelManager_1.default.getModel(c.id);
                const dados = model.getDados(c.dados);
                for (let d of dados) {
                    if (d[2] instanceof Array) {
                        const c = d[2];
                        d[2] = result[c[0]][c[1]];
                    }
                }
                switch (c.status) {
                    case supremus_core_2_ts_base_1.Enums.Status.INSERT:
                        const itemInsert = await ModelInsert_1.ModelInsert.persiste(dao, model, dados);
                        result[c.id] = itemInsert;
                        break;
                    case supremus_core_2_ts_base_1.Enums.Status.UPDATE:
                        const itemUpdate = await ModelUpdate_1.ModelUpdate.persiste(dao, model, dados);
                        result[c.id] = itemUpdate;
                        break;
                    case supremus_core_2_ts_base_1.Enums.Status.DELETE:
                        const itemDelete = await ModelDelete_1.ModelDelete.persiste(dao, model, dados);
                        result[c.id] = itemDelete;
                        break;
                    default:
                        throw new Error('Status inválido.');
                }
            }
            if (config.persistirSql) {
                for (let c of config.persistirSql) {
                    const resultSql = await (dao === null || dao === void 0 ? void 0 : dao.executarSql(c.sql));
                    if (c.retornar === true) {
                        let list = [];
                        if (resultSql !== undefined && resultSql.length > 0) {
                            list = ModelConverter_1.ModelConverter.criarModelConsultaSql(resultSql);
                        }
                        result[c.id] = list;
                    }
                }
            }
            if (config.consultar) {
                for (let configConsulta of config.consultar) {
                    const idConsulta = configConsulta.idConsulta;
                    if (idConsulta) {
                        if (configConsulta.criterios === undefined) {
                            configConsulta.criterios = [];
                        }
                        configConsulta.criterios.push({
                            campo: idConsulta.campo,
                            valor: result[idConsulta.campoResult[0]][idConsulta.campoResult[1]],
                        });
                    }
                    result[configConsulta.key] = await new Consulta_1.default().consultar(configConsulta, dao);
                }
            }
            if (openDao === true) {
                await dao.confirmarTransacao();
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
}
exports.default = ModelPersiste;

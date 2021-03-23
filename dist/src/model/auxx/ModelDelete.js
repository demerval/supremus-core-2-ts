"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
const ModelConverter_1 = require("./ModelConverter");
exports.ModelDelete = {
    async persiste(dao, model, dados) {
        try {
            const nomeTabela = model.getNomeTabela();
            const valores = [];
            let chave = null;
            dados.forEach(d => {
                if (d[4] === true) {
                    chave = d;
                }
            });
            if (chave === null) {
                throw new Error('Não foi informado o id.');
            }
            valores.push(chave[2]);
            await model.onAntesPersistir(dao, dados, supremus_core_2_ts_base_1.Enums.Status.DELETE);
            const sql = `DELETE FROM ${nomeTabela} WHERE ${chave[1]} = ?;`;
            await dao.executarSql(sql, valores);
            await model.onDepoisPersistir(dao, dados, supremus_core_2_ts_base_1.Enums.Status.DELETE);
            return await ModelConverter_1.ModelConverter.criarModel(dados);
        }
        catch (error) {
            throw error;
        }
    },
};

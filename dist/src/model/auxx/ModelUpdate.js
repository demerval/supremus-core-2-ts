"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelUtil_1 = require("./ModelUtil");
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
const ModelConverter_1 = require("./ModelConverter");
exports.ModelUpdate = {
    async persiste(dao, model, dados) {
        try {
            const nomeTabela = model.getNomeTabela();
            await ModelUtil_1.ModelUtil.validarInsertUpdate(dao, nomeTabela, dados, supremus_core_2_ts_base_1.Enums.Status.UPDATE);
            const campos = [];
            const valores = [];
            let chave = null;
            dados.forEach(d => {
                if (d[4] === true) {
                    chave = d;
                }
                else {
                    campos.push(`${d[1]} = ?`);
                    valores.push(d[2]);
                }
            });
            if (chave === null) {
                throw new Error('Não foi informado o id.');
            }
            valores.push(chave[2]);
            await model.onAntesPersistir(dao, dados, supremus_core_2_ts_base_1.Enums.Status.UPDATE);
            const sql = `UPDATE ${nomeTabela} SET ${campos.join(', ')} WHERE ${chave[1]} = ?;`;
            await dao.executarSql(sql, valores);
            await model.onDepoisPersistir(dao, dados, supremus_core_2_ts_base_1.Enums.Status.UPDATE);
            return await ModelConverter_1.ModelConverter.criarModel(dados);
        }
        catch (error) {
            throw error;
        }
    },
};

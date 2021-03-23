"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
exports.ModelUtil = {
    async validarInsertUpdate(dao, nomeTabela, dados, status, campoChave) {
        try {
            let campos = [];
            let valores = [];
            let chave = null;
            for (let values of dados) {
                if (values[4] === true) {
                    chave = values;
                }
                else if (values[3] === true) {
                    campos.push(`${values[1]} = ? `);
                    valores.push(values[2]);
                }
            }
            if (campos.length === 0) {
                return true;
            }
            if (status === supremus_core_2_ts_base_1.Enums.Status.INSERT) {
                chave = [0, campoChave[1].getNome()];
            }
            let sql = `SELECT ${chave[1]} FROM ${nomeTabela} WHERE (${campos.join(' OR ')})`;
            if (status === supremus_core_2_ts_base_1.Enums.Status.UPDATE) {
                sql += ` AND ${chave[1]} <> ?`;
                valores.push(chave[2]);
            }
            let rows = await dao.executarSql(sql, valores);
            if (rows.length) {
                throw Error(`O registro já existe na base de dados!`);
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    },
};

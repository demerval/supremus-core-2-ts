import DAO from "../../database/DAO";
import { Enums } from "supremus-core-2-ts-base";
import Campo from "../../campos/abstract/Campo";

export const ModelUtil = {

  async validarInsertUpdate(dao: DAO, nomeTabela: string, dados: any, status: Enums.Status, campoChave?: [string, Campo]) {
    let campos = [];
    let valores = [];
    let chave = null;

    for (let values of dados) {
      if (values[4] === true) {
        chave = values;
      } else if (values[3] === true) {
        campos.push(`${values[1]} = ? `);
        valores.push(values[2]);
      }
    }

    if (campos.length === 0) {
      return true;
    }

    if (status === Enums.Status.INSERT) {
      chave = [0, campoChave![1].getNome()];
    }

    let sql = `SELECT ${chave[1]} FROM ${nomeTabela} WHERE (${campos.join(' OR ')})`;
    if (status === Enums.Status.UPDATE) {
      sql += ` AND ${chave[1]} <> ?`;
      valores.push(chave[2]);
    }

    let rows = await dao.executarSql(sql, valores);
    if (rows.length) {
      throw Error(`O registro já existe na base de dados!`);
    }

    return true;
  },

}
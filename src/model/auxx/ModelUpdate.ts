import DAO from "../../database/DAO";
import Model from "../Model";
import { Dados } from "../../campos/abstract/Campo";
import { ModelUtil } from "./ModelUtil";
import { Status } from "../../enums";
import { ModelConverter } from "./ModelConverter";

export const ModelUpdate = {

  async persiste(dao: DAO, model: Model, dados: Dados[]) {
    const nomeTabela = model.getNomeTabela();

    await ModelUtil.validarInsertUpdate(dao, nomeTabela, dados, Status.UPDATE);

    const campos: string[] = [];
    const valores: any[] = [];
    let chave = null;

    dados.forEach(d => {
      if (d[4] === true) {
        chave = d;
      } else {
        campos.push(`${d[1]} = ?`);
        valores.push(d[2]);
      }
    });

    if (chave === null) {
      throw new Error('Não foi informado o id.');
    }
    valores.push(chave[2]);

    await model.onAntesPersistir(dao, dados, Status.UPDATE);

    const sql = `UPDATE ${nomeTabela} SET ${campos.join(', ')} WHERE ${chave[1]} = ?;`;
    await dao.executarSql(sql, valores);

    await model.onDepoisPersistir(dao, dados, Status.UPDATE);

    return await ModelConverter.criarModel(dados);
  },

}
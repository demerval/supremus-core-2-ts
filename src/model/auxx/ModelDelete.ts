import DAO from '../../database/DAO';
import Model from '../Model';
import { Dados } from '../../campos/abstract/Campo';
import { Enums } from 'supremus-core-2-ts-base';
import { ModelConverter } from './ModelConverter';

export const ModelDelete = {
  async persiste(dao: DAO, model: Model, dados: Dados[]) {
    try {
      const nomeTabela = model.getNomeTabela();

      const valores: any[] = [];
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

      await model.onAntesPersistir(dao, dados, Enums.Status.DELETE);

      const sql = `DELETE FROM ${nomeTabela} WHERE ${chave[1]} = ?;`;
      await dao.executarSql(sql, valores);

      await model.onDepoisPersistir(dao, dados, Enums.Status.DELETE);

      return await ModelConverter.criarModel(dados);
    } catch (error) {
      throw error;
    }
  },
};

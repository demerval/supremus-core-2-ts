import DAO from '../../database/DAO';
import Model from '../Model';
import { Dados } from '../../campos/abstract/Campo';
import { ModelUtil } from './ModelUtil';
import { Enums } from 'supremus-core-2-ts-base';
import { ModelConverter } from './ModelConverter';

export const ModelUpdate = {
  async persiste(dao: DAO, model: Model, dados: Dados[]) {
    try {
      const nomeTabela = model.getNomeTabela();

      await ModelUtil.validarInsertUpdate(dao, nomeTabela, dados, Enums.Status.UPDATE);

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

      await model.onAntesPersistir(dao, dados, Enums.Status.UPDATE);

      const sql = `UPDATE ${nomeTabela} SET ${campos.join(', ')} WHERE ${chave[1]} = ?;`;
      await dao.executarSql(sql, valores);

      await model.onDepoisPersistir(dao, dados, Enums.Status.UPDATE);

      return await ModelConverter.criarModel(dados);
    } catch (error) {
      throw error;
    }
  },
};

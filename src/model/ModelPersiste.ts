import DAO from '../database/DAO';
import ModelManager from './ModelManager';
import { ModelInsert } from './auxx/ModelInsert';
import { ModelUpdate } from './auxx/ModelUpdate';
import { ModelDelete } from './auxx/ModelDelete';
import { Enums, Persistir } from 'supremus-core-2-ts-base';
import Consulta from '../sql/Consulta';
import { ModelConverter } from './auxx/ModelConverter';

class ModelPersiste {
  async persistir(config: Persistir.ConfigPersist, dao?: DAO) {
    let openDao = dao === undefined;

    try {
      if (openDao === true) {
        dao = new DAO();
        await dao.openConexao(true);
      }

      let result: Record<string, any> = {};

      for (let c of config.persistir) {
        const model = ModelManager.getModel(c.id);
        const dados = model.getDados(c.dados);

        for (let d of dados) {
          if (d[2] instanceof Array) {
            const c = d[2];
            d[2] = result[c[0]][c[1]];
          }
        }

        switch (c.status) {
          case Enums.Status.INSERT:
            const itemInsert = await ModelInsert.persiste(dao!, model, dados);
            result[c.id] = itemInsert;
            break;
          case Enums.Status.UPDATE:
            const itemUpdate = await ModelUpdate.persiste(dao!, model, dados);
            result[c.id] = itemUpdate;
            break;
          case Enums.Status.DELETE:
            const itemDelete = await ModelDelete.persiste(dao!, model, dados);
            result[c.id] = itemDelete;
            break;
          default:
            throw new Error('Status inválido.');
        }
      }

      if (config.persistirSql) {
        for (let c of config.persistirSql) {
          const resultSql = await dao?.executarSql(c.sql);

          if (c.retornar === true) {
            let list: Record<string, any>[] = [];

            if (resultSql !== undefined && resultSql.length > 0) {
              list = ModelConverter.criarModelConsultaSql(resultSql);
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

          result[configConsulta.key] = await new Consulta().consultar(configConsulta, dao!);
        }
      }

      if (openDao === true) {
        await dao!.confirmarTransacao();
      }

      return result;
    } catch (error) {
      throw error;
    } finally {
      if (openDao === true) {
        if (dao!.isConexaoOpen()) {
          dao!.closeConexao();
        }
      }
    }
  }
}

export default ModelPersiste;

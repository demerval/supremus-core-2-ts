import DAO from "../database/DAO";
import SqlConsulta, { ItemConsulta, SubConsultaConfig, SubConsulta } from "./SqlConsulta";
import { ModelConverter } from "../model/auxx/ModelConverter";
import ModelManager from "../model/ModelManager";
import { FieldType } from "../enums";

class Consulta {

  async consultar(config: ItemConsulta | ItemConsulta[], dao?: DAO): Promise<Record<string, any>[] | Record<string, any>> {
    let openDao = (dao === undefined);

    try {
      if (openDao === true) {
        dao = new DAO();
        await dao.openConexao();
      }

      if (config instanceof Array) {
        let rowsResult: Record<string, any> = {};

        for (let c of config) {
          const dados = new SqlConsulta().getDadosConsulta(c);
          let rows = await dao!.executarSql(dados.sql);

          if (c.subConsultas) {
            await this._subConsulta(dao!, dados.campos, c.subConsultas, rows);
          }

          rowsResult[c.key] = await ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
        }

        return rowsResult;
      }

      const dados = new SqlConsulta().getDadosConsulta(config);
      let rows = await dao!.executarSql(dados.sql);

      if (config.subConsultas) {
        await this._subConsulta(dao!, dados.campos, config.subConsultas, rows);
      }

      return await ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
    } catch (error) {
      throw new Error(error);
    } finally {
      if (openDao === true) {
        if (dao!.isConexaoOpen()) {
          dao!.closeConexao();
        }
      }
    }
  }

  async consultarPorId(config: ItemConsulta, dao?: DAO) {
    let openDao = (dao === undefined);

    try {
      if (openDao === true) {
        dao = new DAO();
        await dao.openConexao();
      }

      const model = ModelManager.getModel(config.tabela);
      const chaveCampo = model.getChavePrimaria();

      config.key = 'a';
      config.criterios = [{ campo: chaveCampo[0], valor: config.porId?.id }];

      const dados = new SqlConsulta().getDadosConsulta(config);
      let rows = await dao!.executarSql(dados.sql);

      if (config.subConsultas) {
        await this._subConsulta(dao!, dados.campos, config.subConsultas, rows);
      }

      if (rows.length > 0) {
        const result = await ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
        return result[0];
      }

      return;
    } catch (error) {
      throw new Error(error);
    } finally {
      if (openDao === true) {
        if (dao!.isConexaoOpen()) {
          dao!.closeConexao();
        }
      }
    }
  }

  async consultaPaginada(config: ItemConsulta, dao?: DAO) {
    let openDao = (dao === undefined);

    try {
      if (openDao === true) {
        dao = new DAO();
        await dao.openConexao();
      }

      let totalReg = 0;
      const dados = new SqlConsulta().getDadosConsulta(config, true);
      const rows = await dao!.executarSql(dados.sql);
      if (rows.length > 0) {
        let rowsT = await dao!.executarSql(dados.sqlTotal!);
        totalReg = parseInt(rowsT[0].TOTAL, 0);
      }

      const data = await ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
      return { totalReg, data };
    } catch (error) {
      throw new Error(error);
    } finally {
      if (openDao === true) {
        if (dao!.isConexaoOpen()) {
          dao!.closeConexao();
        }
      }
    }
  }

  async _subConsulta(dao: DAO, campos: [string, string, string, string, FieldType][], subConsultas: SubConsulta[], rows: any[]) {
    for (let cs of subConsultas) {
      for (let row of rows) {
        const subConfig: SubConsultaConfig = { link: cs.link, campos, row }

        const dadosSub = new SqlConsulta().getDadosConsulta(cs, false, subConfig);
        const rowsSub = await dao.executarSql(dadosSub.sql);

        row[cs.key] = await ModelConverter.criarModelConsulta(dadosSub.configs, dadosSub.campos, rowsSub);
      }
    }
  }

}

export default Consulta;
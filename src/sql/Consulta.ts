import DAO from "../database/DAO";
import SqlConsulta from "./SqlConsulta";
import { ModelConverter } from "../model/auxx/ModelConverter";
import ModelManager from "../model/ModelManager";
import { Consulta as Base, Enums } from "supremus-core-2-ts-base";

class Consulta {

  async consultar(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO): Promise<Record<string, any>[]> {
    let openDao = (dao === undefined);

    try {
      if (openDao === true) {
        dao = new DAO();
        await dao.openConexao();
      }

      if (config instanceof Array) {
        throw new Error('Consulta padrao não pode ser um array.');
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

  async consultarArray(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO): Promise<Record<string, any>> {
    let openDao = (dao === undefined);

    try {
      if (openDao === true) {
        dao = new DAO();
        await dao.openConexao();
      }

      if (!(config instanceof Array)) {
        throw new Error('Consulta por array precisa ser um array.');
      }

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

  async consultarPorId(config: Base.ItemConsulta, dao?: DAO): Promise<Record<string, any> | undefined> {
    let openDao = (dao === undefined);

    if (config.porId === undefined) {
      throw new Error('Erro na configuração da consulta porId.');
    }

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

  async consultaPaginada(config: Base.ItemConsulta, dao?: DAO): Promise<{ totalReg: number, data: Record<string, any>[], resultFuncoes: Record<string, any>[] }> {
    let openDao = (dao === undefined);

    if (config.paginado === undefined) {
      throw new Error('Erro na configuração da consulta paginada.');
    }

    try {
      if (openDao === true) {
        dao = new DAO();
        await dao.openConexao();
      }

      let totalReg = 0;
      const resultFuncoes: Record<string, any>[] = [];
      const dados = new SqlConsulta().getDadosConsulta(config, true);
      const rows = await dao!.executarSql(dados.sql);
      if (rows.length > 0) {
        let rowsT = await dao!.executarSql(dados.sqlTotal!);
        const row = rowsT[0];
        totalReg = parseInt(row.TOTAL, 0);
        if (config.paginado.funcoes) {
          for (let fnc of config.paginado.funcoes) {
            resultFuncoes.push({ [fnc.alias]: row[fnc.alias.toUpperCase()] });
          }
        }
      }

      const data = await ModelConverter.criarModelConsulta(dados.configs, dados.campos, rows);
      return { totalReg, data, resultFuncoes };
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

  async _subConsulta(dao: DAO, campos: [string, string, string, string, Enums.FieldType][], subConsultas: Base.SubConsulta[], rows: any[]) {
    for (let cs of subConsultas) {
      for (let row of rows) {
        const subConfig: Base.SubConsultaConfig = { link: cs.link, campos, row }

        const dadosSub = new SqlConsulta().getDadosConsulta(cs, false, subConfig);
        const rowsSub = await dao.executarSql(dadosSub.sql);

        row[cs.key] = await ModelConverter.criarModelConsulta(dadosSub.configs, dadosSub.campos, rowsSub);
      }
    }
  }

}

export default Consulta;
import SqlConsultaUtil from "./SqlConsultaUtil";
import ModelManager from "../model/ModelManager";
import { FieldType } from "../enums";
import { Dados } from "../campos/abstract/Campo";

export interface ItemConsulta {
  key: string;
  tabela: string;
  campos?: string[];
  joins?: ItemJoinConsulta[];
  criterios?: CampoCriterio[];
  ordem?: string[];
  subConsultas?: SubConsulta[];
  paginado?: { pagina: number, qtdeRegistros: number };
  porId?: { id: any };
}

export interface ItemJoinConsulta {
  key: string;
  tabela: string;
  campos?: string[];
  joinTipo?: 'inner' | 'left' | 'right';
  joinOn: [string, [string, string]],
  criterios?: CampoCriterio[];
}

export interface CampoCriterio {
  campo: string;
  valor: any;
  operador?: string;
  comparador?: 'and' | 'or';
}

export interface SubConsulta extends ItemConsulta {
  link: [string, string];
}

export interface SqlConsultaConfig {
  tabela: string;
  criterios?: CampoCriterio[];
}

export interface SubConsultaConfig {
  link: [string, string];
  campos: [string, string, string, string, FieldType][];
  row: Record<string, any>;
}

export interface ConsultaConfig {
  configs: Map<string, SqlConsultaConfig>;
  campos: [string, string, string, string, FieldType][];
  sql: string;
  sqlTotal?: string;
}

class SqlConsulta {

  private sqlUtil: SqlConsultaUtil;
  private configs: Map<string, SqlConsultaConfig>;

  constructor() {
    this.sqlUtil = new SqlConsultaUtil();
    this.configs = new Map();
  }

  getDadosConsulta(config: ItemConsulta, isPaginado = false, subConsulta?: SubConsultaConfig): ConsultaConfig {
    let paginado = isPaginado === true ? `FIRST ${config.paginado?.qtdeRegistros} SKIP ${config.paginado?.pagina! * config.paginado?.qtdeRegistros!} ` : '';
    const dados = this.getDados(config, subConsulta);
    const campos = dados.campos.map(c => `${c[0]}.${c[1]} AS ${c[2]}`);
    let sql = `SELECT ${paginado}${campos.join(', ')} FROM ${dados.tabela}`;
    if (dados.joins) {
      sql += ` ${dados.joins.join(' ')}`;
    }
    if (dados.criterio) {
      sql += ` WHERE ${dados.criterio}`;
    }
    if (dados.ordem) {
      sql += ` ORDER BY ${dados.ordem}`;
    }

    let sqlTotal = undefined;
    if (isPaginado === true) {
      const model = ModelManager.getModel(config.tabela);
      const campoChave = model.getChavePrimaria();
      sqlTotal = `SELECT COUNT(${config.key}.${campoChave[1].getNome()}) AS TOTAL FROM ${dados.tabela}`;
      if (dados.joins) {
        sqlTotal += ` ${dados.joins.join(' ')}`;
      }
      if (dados.criterio) {
        sqlTotal += ` WHERE ${dados.criterio}`;
      }

      sqlTotal = sqlTotal.toUpperCase();
    }

    return {
      configs: this.configs,
      campos: dados.campos,
      sql: sql.toUpperCase(),
      sqlTotal,
    };
  }

  getDados(config: ItemConsulta, subConsulta?: SubConsultaConfig) {
    this.configs.set(config.key, { tabela: config.tabela.toLowerCase(), criterios: config.criterios });

    const model = ModelManager.getModel(config.tabela.toLowerCase());
    const campos = model.getCamposConsulta(config.key, config.campos);

    let joins = undefined;
    if (config.joins) {
      joins = [];
      for (let join of config.joins) {
        this.configs.set(join.key, { tabela: join.tabela.toLowerCase(), criterios: join.criterios });

        const dadosJoin = this.getDadosJoin(join);
        joins.push(dadosJoin.join);
        campos.push(...dadosJoin.campos);
      }
    }

    let criterio = this.sqlUtil.getCriterio(this.configs);
    if (subConsulta !== undefined) {
      if (criterio === undefined) {
        criterio = '';
      }
      criterio += `${config.key}.${this._getCampo(subConsulta.link[0], campos)} = ${this._getValor(subConsulta.link[1], subConsulta)}`;
    }

    const ordem = this.sqlUtil.getDadosOrdem(this.configs, config.ordem);

    return {
      tabela: `${model.getNomeTabela()} AS ${config.key}`,
      campos,
      joins,
      criterio,
      ordem
    };
  }

  getDadosJoin(config: ItemJoinConsulta) {
    const model = ModelManager.getModel(config.tabela.toLowerCase());
    const campos = model.getCamposConsulta(config.key, config.campos);
    const joinTipo = config.joinTipo || 'inner';
    const campo1 = `${config.key}.${model.getCampo(config.joinOn[0])!.getNome()}`;
    const campo2 = this._getCampoJoin(config.joinOn[1]);

    return {
      join: `${joinTipo} join ${model.getNomeTabela()} AS ${config.key} on ${campo1} = ${campo2}`,
      campos,
    };
  }

  _getCampoJoin(campo: [string, string]) {
    const nomeModel = this.configs.get(campo[0])!.tabela;
    const model = ModelManager.getModel(nomeModel);

    const nomeCampo = campo[1];
    const campoModel = model.getCampo(nomeCampo);
    if (campoModel === undefined) {
      throw new Error(`O campo ${nomeCampo} não foi localizado.`);
    }

    return `${campo[0]}.${campoModel.getNome()}`;
  }

  _getCampo(key: string, campos: [string, string, string, string, FieldType][]) {
    const campo = campos.find(c => c[3] === key);
    if (campo === undefined) {
      throw new Error(`O campo ${key} não foi localizado.`);
    }

    return campo[1];
  }

  _getValor(key: string, subConsulta: SubConsultaConfig) {
    const campo = subConsulta.campos.find(d => d[3]);
    if (campo === undefined) {
      throw new Error(`O campo ${key} não foi localizado.`);
    }

    return subConsulta.row[campo[2].toUpperCase()];
  }

}

export default SqlConsulta;

import SqlConsultaUtil from "./SqlConsultaUtil";
import ModelManager from "../model/ModelManager";
import { Consulta as Base, Enums } from 'supremus-core-2-ts-base';
class SqlConsulta {

  private sqlUtil: SqlConsultaUtil;
  private configs: Map<string, Base.SqlConsultaConfig>;

  constructor() {
    this.sqlUtil = new SqlConsultaUtil();
    this.configs = new Map();
  }

  getDadosConsulta(config: Base.ItemConsulta, isPaginado = false, subConsulta?: Base.SubConsultaConfig): Base.ConsultaConfig {
    let paginado = isPaginado === true ? `FIRST ${config.paginado?.qtdeRegistros} SKIP ${config.paginado?.pagina! * config.paginado?.qtdeRegistros!} ` : '';
    const dados = this.getDados(config, subConsulta);
    const agrupar = dados.dadosCampos.agrupar;
    const camposAgrupar: string[] = [];

    const campos = dados.dadosCampos.campos.map(c => {
      if (agrupar === true) {
        if (c.funcao !== undefined) {
          return `${c.funcao}(${c.keyTabela}.${c.nomeCampo}) AS ${c.alias}`;
        }

        if (c.tipo === Enums.FieldType.BLOB) {
          camposAgrupar.push(`CAST(${c.keyTabela}.${c.nomeCampo} AS VARCHAR(4096))`);
        } else {
          camposAgrupar.push(`${c.keyTabela}.${c.nomeCampo}`);
        }
      }

      if (c.tipo === Enums.FieldType.BLOB) {
        return `CAST (${c.keyTabela}.${c.nomeCampo} AS VARCHAR(4096)) AS ${c.alias}`;
      }

      return `${c.keyTabela}.${c.nomeCampo} AS ${c.alias}`;
    });

    let sql = `SELECT ${paginado}${campos.join(', ')} FROM ${dados.tabela}`;
    if (dados.joins) {
      sql += ` ${dados.joins.join(' ')}`;
    }
    if (dados.criterio) {
      sql += ` WHERE ${dados.criterio}`;
    }
    if (agrupar === true && camposAgrupar.length > 0) {
      sql += ` GROUP BY ${camposAgrupar.join(', ')}`;
    }
    if (dados.ordem) {
      sql += ` ORDER BY ${dados.ordem}`;
    }

    let sqlTotal = undefined;
    if (isPaginado === true) {
      const model = ModelManager.getModel(config.tabela);
      const campoChave = model.getChavePrimaria();
      const funcoes: string[] = [`COUNT(${config.key}.${campoChave[1].getNome()}) AS TOTAL`];
      if (config.paginado?.funcoes) {
        for (let fnc of config.paginado.funcoes) {
          const campo = this._getCampoModel(fnc.key, fnc.campo);
          funcoes.push(`${fnc.funcao === undefined ? 'SUM' : fnc.funcao}(${fnc.key}.${campo.getNome()}) AS ${fnc.alias}`);
        }
      }

      sqlTotal = `SELECT ${funcoes.join(', ')} FROM ${dados.tabela}`;
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
      campos: dados.dadosCampos.campos,
      sql: sql.toUpperCase(),
      sqlTotal,
    };
  }

  getDados(config: Base.ItemConsulta, subConsulta?: Base.SubConsultaConfig) {
    this.configs.set(config.key, { tabela: config.tabela.toLowerCase(), criterios: config.criterios });

    const model = ModelManager.getModel(config.tabela.toLowerCase());
    const dadosCampos = model.getCamposConsulta(config.key, config.campos);

    let joins = undefined;
    if (config.joins) {
      joins = [];
      for (let join of config.joins) {
        this.configs.set(join.key, { tabela: join.tabela.toLowerCase(), criterios: join.criterios });

        const dadosJoin = this.getDadosJoin(join);
        joins.push(dadosJoin.join);
        dadosCampos.campos.push(...dadosJoin.dadosCampos.campos);
        if (dadosCampos.agrupar === false && dadosJoin.dadosCampos.agrupar === true) {
          dadosCampos.agrupar = true;
        }
      }
    }

    let criterio = this.sqlUtil.getCriterio(this.configs);
    if (subConsulta !== undefined) {
      if (criterio === undefined) {
        criterio = '';
      }
      criterio += `${config.key}.${this._getCampo(subConsulta.link[0], dadosCampos.campos)} = '${this._getValor(subConsulta.link[1], subConsulta)}'`;
    }

    const ordem = this.sqlUtil.getDadosOrdem(this.configs, config.ordem);

    return {
      tabela: `${model.getNomeTabela()} AS ${config.key}`,
      dadosCampos,
      joins,
      criterio,
      ordem
    };
  }

  getDadosJoin(config: Base.ItemJoinConsulta) {
    const model = ModelManager.getModel(config.tabela.toLowerCase());
    const dadosCampos = model.getCamposConsulta(config.key, config.campos);
    const joinTipo = config.joinTipo || 'inner';
    const campo1 = `${config.key}.${model.getCampo(config.joinOn[0])!.getNome()}`;
    const campo2 = this._getCampoJoin(config.joinOn[1]);

    return {
      join: `${joinTipo} join ${model.getNomeTabela()} AS ${config.key} on ${campo1} = ${campo2}`,
      dadosCampos,
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

  _getCampo(key: string, campos: Base.CampoConsulta[]) {
    const campo = campos.find(c => c.keyCampo === key);
    if (campo === undefined) {
      throw new Error(`O campo ${key} não foi localizado.`);
    }

    return campo.nomeCampo;
  }

  _getValor(key: string, subConsulta: Base.SubConsultaConfig) {
    const campo = subConsulta.campos.find(d => d.keyCampo === key);
    if (campo === undefined) {
      throw new Error(`O campo ${key} não foi localizado.`);
    }

    return subConsulta.row[campo.alias.toUpperCase()];
  }

  _getCampoModel(key: string, nomeCampo: string) {
    const config = this.configs.get(key);
    if (config === undefined) {
      throw new Error(`Não foi localizada a tabela pelo key: ${key}`);
    }

    const model = ModelManager.getModel(config.tabela);
    if (model === undefined) {
      throw new Error(`Não foi localizada a tabela: ${config.tabela}`);
    }

    const campo = model.getCampo(nomeCampo);
    if (campo === undefined) {
      throw new Error(`Não foi localizado o campo: ${nomeCampo} na tabela: ${config.tabela}`);
    }

    return campo;
  }

}

export default SqlConsulta;

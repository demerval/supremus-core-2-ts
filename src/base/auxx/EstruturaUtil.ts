import Model from '../../model/Model';
import Campo from '../../campos/abstract/Campo';
import DAO from '../../database/DAO';

export interface ChavePrimariaConfig {
  nomeTabela: string;
  sql: string;
}

export interface GeradorConfig {
  nomeGerador: string;
  sql: string;
}

export interface ChaveEstrangeiraConfig {
  nomeTabela: string;
  nomeTabelaFk: string;
  nomeCampoFk: string;
  nomeCampoTabelaFk: string;
  onUpdate: string;
  onDelete: string;
}

export interface EstruturaConfig {
  nomeTabela: string;
  versao: number;
  campos: Map<string, Campo>;
  configTabela?: { sql: string };
  configChavePrimaria?: ChavePrimariaConfig;
  configGerador?: GeradorConfig;
  configChaveEstrangeira: ChaveEstrangeiraConfig[];
  onEstruturaVerificada(dao: DAO): Promise<void>;
}

class EstruturaUtil {

  prepare(model: Model) {
    let config: EstruturaConfig = {
      nomeTabela: model.getNomeTabela(),
      versao: model.getVersao(),
      campos: model.getCampos(),
      configChaveEstrangeira: [],
      onEstruturaVerificada: model.onEstruturaVerificada,
    }

    this.criarSql(config);

    return config;
  }

  private criarSql(config: EstruturaConfig) {
    let sql = [];
    sql.push('CREATE TABLE ');
    sql.push(config.nomeTabela);
    sql.push(' (');

    const campos = config.campos.values();
    for (let campo of campos) {
      let tipo = campo.getTipo().toUpperCase();

      sql.push(campo.getNome());
      sql.push(' ');
      sql.push(tipo);
      if (tipo === 'VARCHAR') {
        sql.push('(' + campo.getTamanhoMaximo() + ')');
      }
      if (tipo === 'NUMERIC') {
        sql.push('(18, ' + campo.getDecimal() + ')');
      }
      if (tipo === 'BLOB') {
        sql.push(' SUB_TYPE 1 SEGMENT SIZE 80');
      }
      if (campo.isObrigatorio() === true || campo.isChavePrimaria() === true) {
        sql.push(' NOT NULL');
      }
      sql.push(', ');

      if (campo.isChavePrimaria() === true) {
        const chavePrimaria = campo.getChavePrimaria();

        const sqlCriarPrimaryKey = 'ALTER TABLE ' + config.nomeTabela + ' '
          + 'ADD CONSTRAINT PK_' + config.nomeTabela + ' '
          + 'PRIMARY KEY (' + campo.getNome() + ');';

        config.configChavePrimaria = {
          nomeTabela: config.nomeTabela,
          sql: sqlCriarPrimaryKey,
        }

        if (chavePrimaria?.autoIncremento) {
          const nomeGerador = chavePrimaria.nomeGerador ? chavePrimaria.nomeGerador : `${config.nomeTabela}_GEN`;
          const sqlCriarGenerator = 'CREATE SEQUENCE ' + nomeGerador + ';';
          config.configGerador = {
            nomeGerador,
            sql: sqlCriarGenerator,
          }
        }
      }

      if (campo.isChaveEstrangeira() === true) {
        const chaveEstrangeira = campo.getChaveEstrangeira()!;
        const chave: ChaveEstrangeiraConfig = {
          nomeTabela: config.nomeTabela,
          nomeTabelaFk: chaveEstrangeira.nomeTabela.toUpperCase(),
          nomeCampoFk: campo.getNome(),
          nomeCampoTabelaFk: chaveEstrangeira.nomeCampo.toUpperCase(),
          onUpdate: chaveEstrangeira.onUpdate || 'NO ACTION',
          onDelete: chaveEstrangeira.onDelete || 'NO ACTION',
        }
        config.configChaveEstrangeira.push(chave);
      }
    }

    let s = sql.join('');
    config.configTabela = {
      sql: s.substring(0, s.length - 2) + ');',
    }
  }

}

export default EstruturaUtil;

import Campo, { Dados } from '../campos/abstract/Campo';
import DAO from '../database/DAO';
import { Consulta as Base, Enums } from 'supremus-core-2-ts-base';

class Model {
  private nome: string;
  private nomeTabela: string;
  private campos: Map<string, Campo>;
  private versao: number;
  private verificar: boolean;

  constructor(nome: String, nomeTabela: String, campos: Map<string, Campo>, versao = 1, verificar = true) {
    this.nome = nome.toLowerCase();
    this.nomeTabela = nomeTabela.toUpperCase();
    this.campos = campos;
    this.versao = versao;
    this.verificar = verificar;
  }

  addCampo(nome: string, campo: Campo) {
    this.campos.set(nome, campo);
  }

  isVerificar() {
    return this.verificar;
  }

  getNome() {
    return this.nome;
  }

  getNomeTabela() {
    return this.nomeTabela;
  }

  getCampos() {
    return this.campos;
  }

  getCampo(nome: string) {
    return this.campos.get(nome);
  }

  getVersao() {
    return this.versao;
  }

  getChavePrimaria(): [string, Campo] {
    for (let [key, value] of this.campos) {
      if (value.isChavePrimaria()) {
        return [key, value];
      }
    }

    throw new Error('Chave primaria não localizada.');
  }

  getDados(dados: any): Dados[] {
    const config: Dados[] = [];

    Object.getOwnPropertyNames(dados).forEach(key => {
      const campo = this.campos.get(key);
      if (campo !== undefined) {
        const c = campo.getDados(dados[key], key);
        config.push(c);
      }
    });

    return config;
  }

  getCamposConsulta(
    key: string,
    campos?: (string | Base.CampoFuncao)[],
  ): { agrupar: boolean; campos: Base.CampoConsulta[] } {
    const camposConsulta: Base.CampoConsulta[] = [];
    let agrupar = false;

    if (campos === undefined) {
      for (const [k, c] of this.campos) {
        camposConsulta.push({
          keyTabela: key,
          nomeCampo: c.getNome(),
          alias: `${key}_${c.getNome()}`,
          keyCampo: k,
          tipo: c.getTipo(),
        });
      }
    } else {
      for (const c of campos) {
        if (typeof c === 'string') {
          const campo = this.getCampo(c as string);
          if (campo === undefined) {
            throw new Error(`O campo ${c} não foi localizado.`);
          }
          camposConsulta.push({
            keyTabela: key,
            nomeCampo: campo.getNome(),
            alias: `${key}_${campo.getNome()}`,
            keyCampo: c as string,
            tipo: campo.getTipo(),
          });
        } else {
          agrupar = true;
          const cFunc = c as Base.CampoFuncao;
          const campo = this.getCampo(cFunc.campo);
          if (campo === undefined) {
            throw new Error(`O campo ${cFunc.campo} não foi localizado.`);
          }
          camposConsulta.push({
            keyTabela: key,
            nomeCampo: campo.getNome(),
            alias: cFunc.alias,
            keyCampo: cFunc.campo,
            tipo: campo.getTipo(),
            funcao: cFunc.funcao === undefined ? Enums.FuncoesSql.SUM : cFunc.funcao,
          });
        }
      }
    }

    return { agrupar, campos: camposConsulta };
  }

  async onEstruturaVerificada(dao: DAO) {}

  async onDadosCarregado(item: any) {}

  async onAntesPersistir(dao: DAO, item: any, status: Enums.Status) {}

  async onDepoisPersistir(dao: DAO, item: any, status: Enums.Status) {}
}

export default Model;

import Campo, { Dados } from '../campos/abstract/Campo';
import DAO from '../database/DAO';
import { Enums } from 'supremus-core-2-ts-base';

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

  getCamposConsulta(key: string, campos?: string[]): [string, string, string, string, Enums.FieldType][] {
    const camposConsulta: [string, string, string, string, Enums.FieldType][] = [];

    if (campos === undefined) {
      for (const [k, c] of this.campos) {
        camposConsulta.push([key, c.getNome(), `${key}_${c.getNome()}`, k, c.getTipo()]);
      }
    } else {
      for (const c of campos) {
        const campo = this.getCampo(c);
        if (campo === undefined) {
          throw new Error(`O campo ${c} não foi localizado.`);
        }

        camposConsulta.push([key, campo.getNome(), `${key}_${campo.getNome()}`, c, campo.getTipo()]);
      }
    }

    return camposConsulta;
  }

  async onEstruturaVerificada(dao: DAO) { };

  async onDadosCarregado(item: any) { }

  async onAntesPersistir(dao: DAO, item: any, status: Enums.Status) { }

  async onDepoisPersistir(dao: DAO, item: any, status: Enums.Status) { }

}

export default Model;

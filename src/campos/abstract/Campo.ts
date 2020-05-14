import { Enums } from 'supremus-core-2-ts-base';
import { ChavePrimaria } from '../interfaces/ChavePrimaria';
import { ChaveEstrangeira } from '../interfaces/ChaveEstrangeira';

export interface CampoConfig {
  chavePrimaria?: ChavePrimaria;
  chaveEstrangeira?: ChaveEstrangeira;
  tipoCaracter?: Enums.CaseType;
  decimal?: number;
  obrigatorio?: boolean;
  unico?: boolean;
  tamanhoMinimo?: number;
  tamanhoMaximo?: number;
  valorPadrao?: any;
  naoReplicar?: boolean;
}

export type Dados = [string, string, any, boolean, boolean, Enums.FieldType];

abstract class Campo {

  private nome: string;
  private tipo: Enums.FieldType = Enums.FieldType.VARCHAR;
  private config: CampoConfig = {};

  constructor(nome: string) {
    this.nome = nome.toLowerCase();
  }

  configure(tipo: Enums.FieldType, config?: CampoConfig) {
    this.tipo = tipo;
    if (config) {
      this.config = config;
    }

    if (this.config.obrigatorio === undefined) {
      this.config.obrigatorio = false;
    }
    if (this.config.unico === undefined) {
      this.config.unico = false;
    }
    if (this.config.tamanhoMinimo === undefined) {
      this.config.tamanhoMinimo = -1;
    }
    if (this.config.tamanhoMaximo === undefined) {
      this.config.tamanhoMaximo = 60;
    }
    if (this.config.valorPadrao === undefined) {
      this.config.valorPadrao = null;
    }
  }

  static FieldType() {
    return Enums.FieldType;
  }

  getNome() {
    return this.nome;
  }

  getTipo() {
    return this.tipo!;
  }

  isChavePrimaria() {
    return this.config.chavePrimaria !== undefined;
  }

  getChavePrimaria() {
    return this.config.chavePrimaria;
  }

  isChaveEstrangeira() {
    return this.config.chaveEstrangeira !== undefined;
  }

  isNaoReplicar() {
    return this.config.naoReplicar;
  }

  getChaveEstrangeira() {
    return this.config.chaveEstrangeira;
  }

  getTipoCaracter() {
    return this.config.tipoCaracter;
  }

  getDecimal() {
    return this.config.decimal;
  }

  isObrigatorio() {
    return this.config.obrigatorio!;
  }

  isUnico() {
    return this.config.unico!;
  }

  getValorPadrao() {
    return this.config.valorPadrao!;
  }

  getTamanhoMinimo() {
    return this.config.tamanhoMinimo!;
  }

  getTamanhoMaximo() {
    return this.config.tamanhoMaximo!;
  }

  abstract getDados(valor: any, key: string): Dados;

  abstract getValorSql(valor: any): string;
}

export default Campo;

import Campo, { CampoConfig, Dados } from './abstract/Campo';
import { Enums } from 'supremus-core-2-ts-base';
const md5 = require('js-md5');

interface CampoStringConfig extends CampoConfig {
  password?: boolean;
  blob?: boolean;
}

class CampoString extends Campo {

  private password: boolean;
  private blob: boolean;

  constructor(nome: string, config?: CampoStringConfig) {
    super(nome);

    this.password = false;
    this.blob = false;
    if (config) {
      if (config.password) {
        this.password = config.password;
      }
      if (config.blob) {
        this.blob = config.blob;
      }
    }

    this.configure(this.blob === true ? Campo.FieldType().BLOB : Campo.FieldType().VARCHAR, config);
  }

  getDados(valor: any, key: string): Dados {
    if (valor instanceof Array) {
      return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (valor === undefined || valor === null) {
      if (this.isObrigatorio() === true) {
        if (this.getValorPadrao() !== null) {
          return [key, this.getNome(), this.getValorPadrao(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }

        throw new Error(`O valor é obrigatório, campo: ${key}`);
      }

      return [key, this.getNome(), null, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (typeof valor !== 'string') {
      throw new Error(`O campo ${key} tem que ser uma string.`);
    }

    if (this.getTamanhoMinimo() > 0 && this.getTamanhoMinimo() > valor.length) {
      throw new Error(`O campo ${key} tem que ter no mínimo ${this.getTamanhoMinimo()} caracteres.`);
    }

    if (valor.length > this.getTamanhoMaximo()) {
      throw new Error(`O campo ${key} tem que ter no máximo ${this.getTamanhoMaximo()} caracteres.`);
    }

    switch (this.getTipoCaracter()) {
      case Enums.CaseType.NONE:
        return [key, this.getNome(), this.password === true ? md5.base64(valor) : valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      case Enums.CaseType.LOWER:
        return [key, this.getNome(), this.password === true ? md5.base64(valor.toLowerCase()) : valor.toLowerCase(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      default:
        return [key, this.getNome(), this.password === true ? md5.base64(valor.toUpperCase()) : valor.toUpperCase(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }
  }

  getValorSql(valor: any): string {
    if (valor === undefined || valor === null) {
      return 'NULL';
    }

    if (this.password === true) {
      return `'${md5.base64(valor)}'`;
    }

    return `'${valor}'`;
  }
}

export default CampoString;

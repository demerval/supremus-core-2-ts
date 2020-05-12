import Campo, { CampoConfig, Dados } from './abstract/Campo';
import { FieldType } from '../enums';

interface CampoDateConfig extends CampoConfig {
  tipo?: FieldType;
}

class CampoNumber extends Campo {

  constructor(nome: string, config?: CampoDateConfig) {
    super(nome);

    let tamanhoMaximo = -1;
    let tipo = Campo.FieldType().INTEGER;

    if (config) {
      if (config.decimal) {
        tipo = config.decimal > 0 ? Campo.FieldType().DECIMAL : tipo;
      }
      if (config.tipo) {
        tipo = config.tipo;
      }
      if (config.tamanhoMaximo) {
        tamanhoMaximo = config.tamanhoMaximo;
      }

      config.tamanhoMaximo = tamanhoMaximo;
    } else {
      config = { tipo, tamanhoMaximo };
    }

    this.configure(tipo, config);
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

    if (typeof valor !== 'number') {
      throw new Error(`O campo ${key} tem que ser um número.`);
    }

    if (this.getTamanhoMinimo() > -1 && valor < this.getTamanhoMinimo()) {
      throw new Error(`O campo ${key} tem que ser maior que ${this.getTamanhoMinimo()}.`);
    }

    if (this.getTamanhoMaximo() > -1 && valor > this.getTamanhoMaximo()) {
      throw new Error(`O campo ${key} tem que ser menor ou igual a ${this.getTamanhoMaximo()}.`);
    }

    return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
  }

  getValorSql(valor: any): string {
    if (valor === undefined || valor === null) {
      return 'NULL';
    }

    if (typeof valor === 'string') {
      valor = valor.replace('.', '');
      if (this.getTipo() === Campo.FieldType().DECIMAL) {
        valor = valor.replace(',', '.');
        return valor;
      }

      return valor;
    }

    return valor;
  }
}

export default CampoNumber;

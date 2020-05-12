import Campo, { CampoConfig, Dados } from './abstract/Campo';
import moment from 'moment';

interface CampoDateConfig extends CampoConfig {
  dataUpdate?: boolean;
}

class CampoDate extends Campo {

  private dataUpdate: boolean = false;

  constructor(nome: string, config?: CampoDateConfig) {
    super(nome);

    if (config && config.dataUpdate) {
      this.dataUpdate = config.dataUpdate;
    }

    this.configure(this.dataUpdate === true ? Campo.FieldType().BIG_INT : Campo.FieldType().DATE, config);
  }

  isDateUpdate() {
    return this.dataUpdate;
  }

  getDados(valor: any, key: string): Dados {
    if (valor instanceof Array) {
      return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (valor === undefined || valor === null || valor === '') {
      if (this.isObrigatorio() === true) {
        if (this.getValorPadrao() !== null) {
          return [key, this.getNome(), this.getValorPadrao(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }

        throw new Error(`O valor é obrigatório, campo: ${key}`);
      }

      if (this.dataUpdate === true) {
        return [key, this.getNome(), new Date().getTime(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      }

      return [key, this.getNome(), null, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (this.dataUpdate === true) {
      if (typeof valor !== 'number') {
        throw new Error(`O campo ${key} tem que ser número.`);
      }

      return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (valor instanceof Date) {
      return [key, this.getNome(), `${moment(valor).format('YYYY-MM-DD')}`, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (moment(valor, 'DD/MM/YYYY', true).isValid() === false) {
      throw new Error(`A data do campo ${key} não é válida: ${valor}`);
    }

    return [key, this.getNome(), `${moment(valor, 'DD/MM/YYYY').format('YYYY-MM-DD')}`, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
  }

  getValorSql(valor: any): string {
    if (valor === undefined || valor === null) {
      return 'NULL';
    }

    if (this.dataUpdate === true) {
      return valor;
    }

    if (valor instanceof Date) {
      return `'${moment(valor).format('YYYY-MM-DD')}'`;
    }

    if (moment(valor, 'DD/MM/YYYY', true).isValid() === false) {
      throw new Error(`A data não é válida: ${valor}.`);
    }

    return `'${moment(valor, 'DD/MM/YYYY').format('YYYY-MM-DD')}'`;
  }
}

export default CampoDate;

import Campo, { CampoConfig, Dados } from './abstract/Campo';

class CampoBoolean extends Campo {

  constructor(nome: string, config?: CampoConfig) {
    super(nome);

    this.configure(Campo.FieldType().BOOLEAN, config);
  }

  getDados(valor: any, key: string): Dados {
    if (valor instanceof Array) {
      return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (valor === undefined || valor === null) {
      return [key, this.getNome(), '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (typeof valor === 'boolean') {
      return [key, this.getNome(), valor === true ? '1' : '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }

    if (typeof valor === 'string') {
      if (valor === '') {
        return [key, this.getNome(), '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      }
      if (valor.toLowerCase() === 'true') {
        return [key, this.getNome(), '1', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      }
      if (valor.toLowerCase() === 'false') {
        return [key, this.getNome(), '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      }
      if (valor === '1' || valor === '0') {
        return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      }
    }

    if (typeof valor === 'number') {
      if (valor === 1) {
        return [key, this.getNome(), '1', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      }
      if (valor === 0) {
        return [key, this.getNome(), '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
      }
    }

    throw new Error(`O campo ${key} tem que ser booleano.`);
  }

  getValorSql(valor: any): string {
    if (valor === undefined || valor === null) {
      return '0';
    }

    if (typeof valor === 'boolean') {
      return valor === true ? '1' : '0';
    }

    if (typeof valor === 'string') {
      if (valor === '') {
        return '0';
      }
      if (valor.toLowerCase() === 'true') {
        return '1';
      }
      if (valor.toLowerCase() === 'false') {
        return '0';
      }
      if (valor === '1' || valor === '0') {
        return valor;
      }
    }

    if (typeof valor === 'number') {
      if (valor === 1) {
        return '1';
      }
      if (valor === 0) {
        return '0';
      }
    }

    throw new Error(`Erro no valor informado o valor tem que ser booleano. Valor: ${valor}`)
  }
}

export default CampoBoolean;

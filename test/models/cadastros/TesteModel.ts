import { Model, CampoNumber, CampoString } from '../../../index';

const campos = new Map();
campos.set('id', new CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('nome', new CampoString('nome', { obrigatorio: true, unico: true, tamanhoMaximo: 30 }));

export default new Model('teste', 'teste', campos, 1, false);
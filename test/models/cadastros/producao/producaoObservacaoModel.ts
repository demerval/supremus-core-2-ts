import { Model, CampoNumber, CampoString, CampoBoolean } from '../../../../index';

const campos = new Map();
campos.set('id', new CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('descricao', new CampoString('descricao', { obrigatorio: true, unico: true, }));
campos.set('ativo', new CampoBoolean('ativo'));

export default new Model('producaoObs', 'producao_obs', campos, 1);
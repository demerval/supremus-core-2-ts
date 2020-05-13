import { Model, CampoNumber, CampoDate, CampoString } from 'supremus-core-2-../../../index';

const campos = new Map();
campos.set('id', new CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('data', new CampoDate('data', { obrigatorio: true }));
campos.set('hora', new CampoString('hora', { tamanhoMaximo: 5 }))
campos.set('idCliente', new CampoNumber('cod_cliente', { obrigatorio: true }));
campos.set('idMotorista', new CampoNumber('cod_motorista', { obrigatorio: true }));
campos.set('situacao', new CampoNumber('situacao'));
campos.set('usuario', new CampoString('usuario'))

export default new Model('producaoEntrada', 'producao_entrada', campos, 2);
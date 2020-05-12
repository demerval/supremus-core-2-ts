import Model from './Model';
import CampoNumber from '../campos/CampoNumber';
import CampoDate from '../campos/CampoDate';
import CampoString from '../campos/CampoString';
import CampoBoolean from '../campos/CampoBoolean';
import Campo from '../campos/abstract/Campo';

const campos: Map<string, Campo> = new Map();
campos.set('id', new CampoNumber('id', { chavePrimaria: { autoIncremento: true } }));
campos.set('dataCadastro', new CampoDate('data_cadastro', { obrigatorio: true }));
campos.set('nome', new CampoString('nome', { obrigatorio: true, unico: true }));
campos.set('senha', new CampoString('senha', { obrigatorio: true, password: true }));
campos.set('ativo', new CampoBoolean('ativo'));


describe('Testando model', () => {

  it('Geracao do map dos campos', () => {
    const model = new Model('cliente', 'clientes', campos, 1);
    const campo = model.getCampo('dataCadastro');
    expect(campo?.getNome()).toBe('data_cadastro');
  });

});
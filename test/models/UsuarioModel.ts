import { Model, CaseType, CampoNumber, CampoString, CampoBoolean, ModelUpdateVersao } from '../../index';
import DAO from '../../src/database/DAO';

const campos = new Map();
campos.set('id', new CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('nome', new CampoString('nome', { obrigatorio: true, unico: true, tamanhoMaximo: 30 }));
campos.set('senha', new CampoString('senha', { tipoCaracter: CaseType.NONE, password: true }));
campos.set('ativo', new CampoBoolean('ativo'));

class UsuarioModel extends Model {

  constructor() {
    super('usuario', 'usuarios', campos, 1);
  }

  async onEstruturaVerificada(dao: DAO) {
    const model = await ModelUpdateVersao.getModelVersao(dao, 'usuario');
    model.versaoUpdate = 1;
    await ModelUpdateVersao.atualizarVersao(dao, model);
  }

}

export default new UsuarioModel();
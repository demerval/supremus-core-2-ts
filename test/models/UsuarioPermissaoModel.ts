import { Model, CampoNumber, CampoString } from '../../index';

const campos = new Map();
campos.set('id', new CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('idUsuario', new CampoNumber('cod_usuario',
  {
    obrigatorio: true,
    chaveEstrangeira: {
      nomeTabela: 'usuarios',
      nomeCampo: 'codigo',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }
));
campos.set('permissao', new CampoString('permissao', { obrigatorio: true, tamanhoMinimo: 5, tamanhoMaximo: 20 }));

export default new Model('usuarioPermissao', 'usuarios_permissao', campos, 1);
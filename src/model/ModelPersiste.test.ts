require('dotenv/config');

import SupremusCore from '../SupremusCore';
import path from 'path';

import { ConfigPersist } from './ModelPersiste';
import { Status } from '../enums';
import DAO from '../database/DAO';
import ModelManager from './ModelManager';

let idUsuario = 0;

const apagar = async (sql: string) => {
  try {
    const dao = new DAO();

    await dao.openConexao();
    await dao.executarSql(sql);

    dao.closeConexao();
  } catch {

  }
}

const apagarTudo = async () => {
  await apagar('drop table estrutura_versao;');
  await apagar('drop table update_versao_2');
  await apagar('drop table usuarios_permissao');
  await apagar('drop table usuarios');
  await apagar('drop table clientes');
  await apagar('drop table producao_obs');
  await apagar('drop table producao_entrada');
  await apagar('drop table producao_entrada_item');
  await apagar('drop table producao_entrada_item_obs');

  await apagar('drop generator usuarios_gen');
  await apagar('drop generator usuarios_permissao_gen');
  await apagar('drop generator clientes_gen');
  await apagar('drop generator producao_obs_gen');
  await apagar('drop generator producao_entrada_gen');
  await apagar('drop generator producao_entrada_item_gen');
  await apagar('drop generator producao_entrada_item_obs_gen');
}

beforeAll(async () => {
  await apagarTudo();
});

describe('Teste de persistencia de dados', () => {

  it('Cria estrutura', async () => {
    ModelManager.clearModels();
    await SupremusCore.carregarModels(path.resolve('test', 'models'));
  });

  it('Verifica estrutura', async () => {
    ModelManager.clearModels();
    await SupremusCore.carregarModels(path.resolve('test', 'models'));
  });

  it('Apagar registros', async () => {
    const dao = new DAO();

    try {
      await dao.openConexao();
      dao.executarSql('delete from usuarios');
    } finally {
      if (dao.isConexaoOpen()) {
        dao.closeConexao();
      }
    }
  });

  it('Novo registro', async () => {
    const config: ConfigPersist = {
      persistir: [
        { id: 'usuario', status: Status.INSERT, dados: { nome: 'suporte', senha: '12345678', ativo: true } },
        { id: 'usuarioPermissao', status: Status.INSERT, dados: { idUsuario: ['usuario', 'id'], permissao: 'admin' } }
      ]
    };

    const result = await SupremusCore.modelPersiste(config);
    expect(Object.keys(result)).toEqual(['usuario', 'usuarioPermissao']);
    expect(Object.keys(result.usuario)).toEqual(['id', 'nome', 'senha', 'ativo']);
    expect(Object.keys(result.usuarioPermissao)).toEqual(['id', 'idUsuario', 'permissao']);

    idUsuario = result.usuario.id;
  });

  it('Editar registro', async () => {
    let usuario = await SupremusCore.modelConsultarPorId({ key: 'u', tabela: 'usuario', porId: { id: idUsuario } });
    usuario!.nome = 'suporte 2';

    const config: ConfigPersist = {
      persistir: [
        { id: 'usuario', status: Status.UPDATE, dados: usuario },
      ],
      consultar: [
        {
          key: 'u',
          tabela: 'usuario',
          idConsulta: { campo: 'id', campoResult: ['usuario', 'id'] },
          joins: [{
            key: 'up',
            tabela: 'usuarioPermissao',
            campos: ['permissao'],
            joinOn: ['idUsuario', ['u', 'id']],
          }]
        }
      ]
    };

    const result = await SupremusCore.modelPersiste(config);
    expect(Object.keys(result)).toEqual(['usuario', 'u']);
    expect(Object.keys(result.usuario)).toEqual(['id', 'nome', 'senha', 'ativo']);
    expect(Object.keys(result.u[0])).toEqual(['id', 'nome', 'senha', 'ativo', 'up']);
  });

  it('Deletar registro', async () => {
    let usuario = await SupremusCore.modelConsultarPorId({ key: 'u', tabela: 'usuario', porId: { id: idUsuario } });

    const config: ConfigPersist = {
      persistir: [
        { id: 'usuario', status: Status.DELETE, dados: usuario },
      ],
    };

    const result = await SupremusCore.modelPersiste(config);
    expect(Object.keys(result)).toEqual(['usuario']);
  });

});


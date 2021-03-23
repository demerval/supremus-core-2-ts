"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
const SupremusCore_1 = __importDefault(require("../SupremusCore"));
const path_1 = __importDefault(require("path"));
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
const DAO_1 = __importDefault(require("../database/DAO"));
const ModelManager_1 = __importDefault(require("./ModelManager"));
let idUsuario = 0;
const apagar = async (sql) => {
    try {
        const dao = new DAO_1.default();
        await dao.openConexao();
        await dao.executarSql(sql);
        dao.closeConexao();
    }
    catch {
    }
};
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
};
beforeAll(async () => {
    await apagarTudo();
});
describe('Teste de persistencia de dados', () => {
    it('Cria estrutura', async () => {
        ModelManager_1.default.clearModels();
        await SupremusCore_1.default.carregarModels(path_1.default.resolve('test', 'models'));
    });
    it('Verifica estrutura', async () => {
        ModelManager_1.default.clearModels();
        await SupremusCore_1.default.carregarModels(path_1.default.resolve('test', 'models'));
    });
    it('Apagar registros', async () => {
        const dao = new DAO_1.default();
        try {
            await dao.openConexao();
            dao.executarSql('delete from usuarios');
        }
        finally {
            if (dao.isConexaoOpen()) {
                dao.closeConexao();
            }
        }
    });
    it('Novo registro', async () => {
        const config = {
            persistir: [
                { id: 'usuario', status: supremus_core_2_ts_base_1.Enums.Status.INSERT, dados: { nome: 'suporte', senha: '12345678', ativo: true } },
                { id: 'usuarioPermissao', status: supremus_core_2_ts_base_1.Enums.Status.INSERT, dados: { idUsuario: ['usuario', 'id'], permissao: 'admin' } }
            ]
        };
        const result = await SupremusCore_1.default.modelPersiste(config);
        expect(Object.keys(result)).toEqual(['usuario', 'usuarioPermissao']);
        expect(Object.keys(result.usuario)).toEqual(['id', 'nome', 'senha', 'ativo']);
        expect(Object.keys(result.usuarioPermissao)).toEqual(['id', 'idUsuario', 'permissao']);
        idUsuario = result.usuario.id;
    });
    it('Persistir com sql', async () => {
        let usuario = await SupremusCore_1.default.modelConsultarPorId({ key: 'u', tabela: 'usuario', porId: { id: idUsuario } });
        usuario.nome = 'suporte teste';
        const config = {
            persistir: [
                { id: 'usuario', status: supremus_core_2_ts_base_1.Enums.Status.UPDATE, dados: usuario },
            ],
            persistirSql: [
                { id: 'up', retornar: true, sql: `select * from usuarios_permissao where cod_usuario = ${idUsuario}` },
            ]
        };
        const result = await SupremusCore_1.default.modelPersiste(config);
        expect(Object.keys(result)).toEqual(['usuario', 'up']);
        expect(Object.keys(result.usuario)).toEqual(['id', 'nome', 'senha', 'ativo']);
        expect(Object.keys(result.up[0])).toEqual(['id', 'idUsuario', 'permissao']);
    });
    it('Persistir com sql update', async () => {
        let usuario = await SupremusCore_1.default.modelConsultarPorId({ key: 'u', tabela: 'usuario', porId: { id: idUsuario } });
        usuario.nome = 'suporte teste';
        const config = {
            persistir: [
                { id: 'usuario', status: supremus_core_2_ts_base_1.Enums.Status.UPDATE, dados: usuario },
            ],
            persistirSql: [
                { id: 'up', retornar: false, sql: `update usuarios_permissao set permissao = 'user' where cod_usuario = ${idUsuario}` },
            ]
        };
        const result = await SupremusCore_1.default.modelPersiste(config);
        expect(Object.keys(result)).toEqual(['usuario']);
        expect(Object.keys(result.usuario)).toEqual(['id', 'nome', 'senha', 'ativo']);
    });
    it('Editar registro', async () => {
        let usuario = await SupremusCore_1.default.modelConsultarPorId({ key: 'u', tabela: 'usuario', porId: { id: idUsuario } });
        usuario.nome = 'suporte 2';
        const config = {
            persistir: [
                { id: 'usuario', status: supremus_core_2_ts_base_1.Enums.Status.UPDATE, dados: usuario },
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
        const result = await SupremusCore_1.default.modelPersiste(config);
        expect(Object.keys(result)).toEqual(['usuario', 'u']);
        expect(Object.keys(result.usuario)).toEqual(['id', 'nome', 'senha', 'ativo']);
        expect(Object.keys(result.u[0])).toEqual(['id', 'nome', 'senha', 'ativo', 'up']);
    });
    it('Consulta paginada com funcao', async () => {
        const config = {
            key: 'u',
            tabela: 'usuario',
            paginado: {
                pagina: 0, qtdeRegistros: 10, funcoes: [
                    { key: 'u', campo: 'id', alias: 'somaId' },
                    { key: 'up', campo: 'id', alias: 'countIdPermissao', funcao: supremus_core_2_ts_base_1.Enums.FuncoesSql.COUNT }
                ]
            },
            joins: [{
                    key: 'up',
                    tabela: 'usuarioPermissao',
                    joinOn: ['idUsuario', ['u', 'id']],
                }]
        };
        const rows = await SupremusCore_1.default.modelConsultarPaginado(config);
    });
    it('Consulta agrupada', async () => {
        const config = {
            key: 'u',
            tabela: 'usuario',
            joins: [{
                    key: 'up',
                    tabela: 'usuarioPermissao',
                    campos: ['permissao', { campo: 'id', alias: 'countId', funcao: supremus_core_2_ts_base_1.Enums.FuncoesSql.COUNT }],
                    joinOn: ['idUsuario', ['u', 'id']],
                }]
        };
        const rows = await SupremusCore_1.default.modelConsultar(config);
    });
    it('Consulta com subconsulta', async () => {
        const config = {
            key: 'u',
            tabela: 'usuario',
            subConsultas: [
                { key: 'up', tabela: 'usuarioPermissao', link: ['idUsuario', 'id'] },
            ]
        };
        const rows = await SupremusCore_1.default.modelConsultar(config);
    });
    it('Consulta sql', async () => {
        const config = [{
                key: 'u',
                sql: 'select codigo as id, nome from usuarios',
            }, {
                key: 'up',
                sql: 'select codigo as id, cod_usuario as id_usuario, permissao from usuarios_permissao'
            }];
        const rows = await SupremusCore_1.default.modelConsultarSql(config);
    });
    it('Consulta criterio array', async () => {
        const config = {
            key: 'up',
            tabela: 'usuarioPermissao',
            criterios: [[{ campo: 'permissao', valor: 'admin', comparador: 'or' }, { campo: 'permissao', valor: 'user' }]],
            ordem: ['permissao'],
        };
        const rows = await SupremusCore_1.default.modelConsultar(config);
    });
    it('Deletar registro', async () => {
        let usuario = await SupremusCore_1.default.modelConsultarPorId({ key: 'u', tabela: 'usuario', porId: { id: idUsuario } });
        const config = {
            persistir: [
                { id: 'usuario', status: supremus_core_2_ts_base_1.Enums.Status.DELETE, dados: usuario },
            ],
        };
        const result = await SupremusCore_1.default.modelPersiste(config);
        expect(Object.keys(result)).toEqual(['usuario']);
    });
});

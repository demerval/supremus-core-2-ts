"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
var SupremusCore_1 = __importDefault(require("../SupremusCore"));
var path_1 = __importDefault(require("path"));
var supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
var DAO_1 = __importDefault(require("../database/DAO"));
var ModelManager_1 = __importDefault(require("./ModelManager"));
var idUsuario = 0;
var apagar = function (sql) { return __awaiter(void 0, void 0, void 0, function () {
    var dao, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                dao = new DAO_1.default();
                return [4 /*yield*/, dao.openConexao()];
            case 1:
                _b.sent();
                return [4 /*yield*/, dao.executarSql(sql)];
            case 2:
                _b.sent();
                dao.closeConexao();
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var apagarTudo = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apagar('drop table estrutura_versao;')];
            case 1:
                _a.sent();
                return [4 /*yield*/, apagar('drop table update_versao_2')];
            case 2:
                _a.sent();
                return [4 /*yield*/, apagar('drop table usuarios_permissao')];
            case 3:
                _a.sent();
                return [4 /*yield*/, apagar('drop table usuarios')];
            case 4:
                _a.sent();
                return [4 /*yield*/, apagar('drop table clientes')];
            case 5:
                _a.sent();
                return [4 /*yield*/, apagar('drop table producao_obs')];
            case 6:
                _a.sent();
                return [4 /*yield*/, apagar('drop table producao_entrada')];
            case 7:
                _a.sent();
                return [4 /*yield*/, apagar('drop table producao_entrada_item')];
            case 8:
                _a.sent();
                return [4 /*yield*/, apagar('drop table producao_entrada_item_obs')];
            case 9:
                _a.sent();
                return [4 /*yield*/, apagar('drop generator usuarios_gen')];
            case 10:
                _a.sent();
                return [4 /*yield*/, apagar('drop generator usuarios_permissao_gen')];
            case 11:
                _a.sent();
                return [4 /*yield*/, apagar('drop generator clientes_gen')];
            case 12:
                _a.sent();
                return [4 /*yield*/, apagar('drop generator producao_obs_gen')];
            case 13:
                _a.sent();
                return [4 /*yield*/, apagar('drop generator producao_entrada_gen')];
            case 14:
                _a.sent();
                return [4 /*yield*/, apagar('drop generator producao_entrada_item_gen')];
            case 15:
                _a.sent();
                return [4 /*yield*/, apagar('drop generator producao_entrada_item_obs_gen')];
            case 16:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, apagarTudo()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Teste de persistencia de dados', function () {
    it('Cria estrutura', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ModelManager_1.default.clearModels();
                    return [4 /*yield*/, SupremusCore_1.default.carregarModels(path_1.default.resolve('test', 'models'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Verifica estrutura', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ModelManager_1.default.clearModels();
                    return [4 /*yield*/, SupremusCore_1.default.carregarModels(path_1.default.resolve('test', 'models'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Apagar registros', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dao;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dao = new DAO_1.default();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, dao.openConexao()];
                case 2:
                    _a.sent();
                    dao.executarSql('delete from usuarios');
                    return [3 /*break*/, 4];
                case 3:
                    if (dao.isConexaoOpen()) {
                        dao.closeConexao();
                    }
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('Novo registro', function () { return __awaiter(void 0, void 0, void 0, function () {
        var config, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        persistir: [
                            { id: 'usuario', status: supremus_core_2_ts_base_1.Enums.Status.INSERT, dados: { nome: 'suporte', senha: '12345678', ativo: true } },
                            { id: 'usuarioPermissao', status: supremus_core_2_ts_base_1.Enums.Status.INSERT, dados: { idUsuario: ['usuario', 'id'], permissao: 'admin' } }
                        ]
                    };
                    return [4 /*yield*/, SupremusCore_1.default.modelPersiste(config)];
                case 1:
                    result = _a.sent();
                    expect(Object.keys(result)).toEqual(['usuario', 'usuarioPermissao']);
                    expect(Object.keys(result.usuario)).toEqual(['id', 'nome', 'senha', 'ativo']);
                    expect(Object.keys(result.usuarioPermissao)).toEqual(['id', 'idUsuario', 'permissao']);
                    idUsuario = result.usuario.id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('Editar registro', function () { return __awaiter(void 0, void 0, void 0, function () {
        var usuario, config, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, SupremusCore_1.default.modelConsultarPorId({ key: 'u', tabela: 'usuario', porId: { id: idUsuario } })];
                case 1:
                    usuario = _a.sent();
                    usuario.nome = 'suporte 2';
                    config = {
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
                    return [4 /*yield*/, SupremusCore_1.default.modelPersiste(config)];
                case 2:
                    result = _a.sent();
                    expect(Object.keys(result)).toEqual(['usuario', 'u']);
                    expect(Object.keys(result.usuario)).toEqual(['id', 'nome', 'senha', 'ativo']);
                    expect(Object.keys(result.u[0])).toEqual(['id', 'nome', 'senha', 'ativo', 'up']);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Consulta paginada com funcao', function () { return __awaiter(void 0, void 0, void 0, function () {
        var config, rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
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
                    return [4 /*yield*/, SupremusCore_1.default.modelConsultarPaginado(config)];
                case 1:
                    rows = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Consulta agrupada', function () { return __awaiter(void 0, void 0, void 0, function () {
        var config, rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        key: 'u',
                        tabela: 'usuario',
                        joins: [{
                                key: 'up',
                                tabela: 'usuarioPermissao',
                                campos: ['permissao', { key: 'up', campo: 'id', alias: 'countId', funcao: supremus_core_2_ts_base_1.Enums.FuncoesSql.COUNT }],
                                joinOn: ['idUsuario', ['u', 'id']],
                            }]
                    };
                    return [4 /*yield*/, SupremusCore_1.default.modelConsultar(config)];
                case 1:
                    rows = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deletar registro', function () { return __awaiter(void 0, void 0, void 0, function () {
        var usuario, config, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, SupremusCore_1.default.modelConsultarPorId({ key: 'u', tabela: 'usuario', porId: { id: idUsuario } })];
                case 1:
                    usuario = _a.sent();
                    config = {
                        persistir: [
                            { id: 'usuario', status: supremus_core_2_ts_base_1.Enums.Status.DELETE, dados: usuario },
                        ],
                    };
                    return [4 /*yield*/, SupremusCore_1.default.modelPersiste(config)];
                case 2:
                    result = _a.sent();
                    expect(Object.keys(result)).toEqual(['usuario']);
                    return [2 /*return*/];
            }
        });
    }); });
});

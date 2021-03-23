"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelManager_1 = __importDefault(require("../model/ModelManager"));
const SupremusCore_1 = __importDefault(require("../SupremusCore"));
const ST_1 = __importDefault(require("./ST"));
const path_1 = __importDefault(require("path"));
describe('Teste basico ST', () => {
    it('Geração SQL', async () => {
        ModelManager_1.default.clearModels();
        await SupremusCore_1.default.carregarModels(path_1.default.resolve('test', 'models'));
        const select = ST_1.default()
            .select('usuario')
            .campos(['id', 'nome'])
            .join('usuarioPermissao', ['usuario.id', 'usuarioPermissao.idUsuario'], st => st.joinTipo('left').campos('permissao').criterio('id', 20).ordem('permissao'))
            .criterio('id', 10)
            //.criterio('ativo', true)
            //.criterio('nome', 'teste')
            //.criterioBetween('valor', [10, 100])
            //.criterioGroup(st => st.criterioOr('idEmpresa', 0).criterio('idEmpresa', 2))
            .ordem('nome')
            .ordem('id');
        const sql = ST_1.default().teste(select);
        expect(sql).toEqual('select a.id, a.nome from usuario a where a.id = 10 and a.ativo = true and ( a.idEmpresa = 0 or a.idEmpresa = 2 ) order by a.nome asc, a.id asc');
    });
});

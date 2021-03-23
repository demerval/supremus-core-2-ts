import ModelManager from '../model/ModelManager';
import SupremusCore from '../SupremusCore';
import st from './ST';
import path from 'path';

describe('Teste basico ST', () => {
  it('Geração SQL', async () => {
    ModelManager.clearModels();
    await SupremusCore.carregarModels(path.resolve('test', 'models'));

    const select = st()
      .select('usuario')
      .campos('id', 'nome')
      .join('usuarioPermissao', ['usuario.id', 'usuarioPermissao.idUsuario'], st =>
        st.joinTipo('left').campos('permissao').criterio('id', 20).ordem('permissao'),
      )
      .criterio('id', 10)
      //.criterio('ativo', true)
      //.criterio('nome', 'teste')
      //.criterioBetween('valor', [10, 100])
      //.criterioGroup(st => st.criterioOr('idEmpresa', 0).criterio('idEmpresa', 2))
      .ordem('nome')
      .ordem('id');

    const sql = st().teste(select);
    expect(sql).toEqual(
      'select a.id, a.nome from usuario a where a.id = 10 and a.ativo = true and ( a.idEmpresa = 0 or a.idEmpresa = 2 ) order by a.nome asc, a.id asc',
    );
  });
});

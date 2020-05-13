import { Model, CampoNumber, CampoBoolean } from '../../../index';

const campos = new Map();
campos.set('id', new CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('idEntradaItem', new CampoNumber('cod_entrada_item',
  {
    obrigatorio: true,
    chaveEstrangeira: {
      nomeTabela: 'producao_entrada_item',
      nomeCampo: 'codigo',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }
  }
));
campos.set('idObs', new CampoNumber('cod_obs',
  {
    obrigatorio: true,
    chaveEstrangeira: {
      nomeTabela: 'producao_obs',
      nomeCampo: 'codigo',
    }
  }
));
campos.set('ativo', new CampoBoolean('ativo'));

export default new Model('producaoEntradaItemObs', 'producao_entrada_item_obs', campos, 1);

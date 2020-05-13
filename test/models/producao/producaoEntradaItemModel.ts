import { Model, CampoNumber, CampoString, CampoBoolean, CampoDate } from '../../../index';

const campos = new Map();
campos.set('id', new CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('idEntrada', new CampoNumber('cod_entrada',
  {
    obrigatorio: true,
    chaveEstrangeira: {
      nomeTabela: 'producao_entrada',
      nomeCampo: 'codigo',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }
  }
));
campos.set('qtdeEntrada', new CampoNumber('qtde_entrada', { obrigatorio: true }));
campos.set('qtdeProducao', new CampoNumber('qtde_producao'));
campos.set('qtdeDif', new CampoNumber('qtde_dif'));
campos.set('pesoTotal', new CampoNumber('peso_total', { decimal: 3 }));
campos.set('idLacre', new CampoNumber('cod_lacre'));
campos.set('idModelo', new CampoNumber('cod_modelo', { obrigatorio: true }));
campos.set('idTamanho', new CampoNumber('cod_tamanho', { obrigatorio: true }));
campos.set('produtoRef', new CampoString('produto_ref', { tamanhoMaximo: 20 }))
campos.set('numeroNFCliente', new CampoNumber('n_nf_clien'));
campos.set('dataAgendada', new CampoDate('data_agendada'));
campos.set('horaAgendada', new CampoString('hora_agendada', { tamanhoMaximo: 5 }))
campos.set('usuarioAgendou', new CampoString('usuario_agendou'))
campos.set('obs', new CampoString('obs', { tamanhoMaximo: 100 }))
campos.set('producao', new CampoBoolean('producao'));
campos.set('finalizado', new CampoBoolean('finalizado'));
campos.set('informouQtde', new CampoBoolean('informou_qtde'));


export default new Model('producaoEntradaItem', 'producao_entrada_item', campos, 1);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../index");
const campos = new Map();
campos.set('id', new index_1.CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('idEntrada', new index_1.CampoNumber('cod_entrada', {
    obrigatorio: true,
    chaveEstrangeira: {
        nomeTabela: 'producao_entrada',
        nomeCampo: 'codigo',
        onUpdate: 'cascade',
        onDelete: 'cascade',
    }
}));
campos.set('qtdeEntrada', new index_1.CampoNumber('qtde_entrada', { obrigatorio: true }));
campos.set('qtdeProducao', new index_1.CampoNumber('qtde_producao'));
campos.set('qtdeDif', new index_1.CampoNumber('qtde_dif'));
campos.set('pesoTotal', new index_1.CampoNumber('peso_total', { decimal: 3 }));
campos.set('idLacre', new index_1.CampoNumber('cod_lacre'));
campos.set('idModelo', new index_1.CampoNumber('cod_modelo', { obrigatorio: true }));
campos.set('idTamanho', new index_1.CampoNumber('cod_tamanho', { obrigatorio: true }));
campos.set('produtoRef', new index_1.CampoString('produto_ref', { tamanhoMaximo: 20 }));
campos.set('numeroNFCliente', new index_1.CampoNumber('n_nf_clien'));
campos.set('dataAgendada', new index_1.CampoDate('data_agendada'));
campos.set('horaAgendada', new index_1.CampoString('hora_agendada', { tamanhoMaximo: 5 }));
campos.set('usuarioAgendou', new index_1.CampoString('usuario_agendou'));
campos.set('obs', new index_1.CampoString('obs', { tamanhoMaximo: 100 }));
campos.set('producao', new index_1.CampoBoolean('producao'));
campos.set('finalizado', new index_1.CampoBoolean('finalizado'));
campos.set('informouQtde', new index_1.CampoBoolean('informou_qtde'));
exports.default = new index_1.Model('producaoEntradaItem', 'producao_entrada_item', campos, 1);

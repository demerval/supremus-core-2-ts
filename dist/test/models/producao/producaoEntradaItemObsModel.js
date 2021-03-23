"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../index");
const campos = new Map();
campos.set('id', new index_1.CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('idEntradaItem', new index_1.CampoNumber('cod_entrada_item', {
    obrigatorio: true,
    chaveEstrangeira: {
        nomeTabela: 'producao_entrada_item',
        nomeCampo: 'codigo',
        onUpdate: 'cascade',
        onDelete: 'cascade',
    }
}));
campos.set('idObs', new index_1.CampoNumber('cod_obs', {
    obrigatorio: true,
    chaveEstrangeira: {
        nomeTabela: 'producao_obs',
        nomeCampo: 'codigo',
    }
}));
campos.set('ativo', new index_1.CampoBoolean('ativo'));
exports.default = new index_1.Model('producaoEntradaItemObs', 'producao_entrada_item_obs', campos, 1);

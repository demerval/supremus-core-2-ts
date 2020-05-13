"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
var campos = new Map();
campos.set('id', new index_1.CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('idUsuario', new index_1.CampoNumber('cod_usuario', {
    obrigatorio: true,
    chaveEstrangeira: {
        nomeTabela: 'usuarios',
        nomeCampo: 'codigo',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }
}));
campos.set('permissao', new index_1.CampoString('permissao', { obrigatorio: true, tamanhoMinimo: 5, tamanhoMaximo: 20 }));
exports.default = new index_1.Model('usuarioPermissao', 'usuarios_permissao', campos, 1);

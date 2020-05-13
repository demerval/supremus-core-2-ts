"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../../index");
var campos = new Map();
campos.set('id', new index_1.CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('descricao', new index_1.CampoString('descricao', { obrigatorio: true, unico: true, }));
campos.set('ativo', new index_1.CampoBoolean('ativo'));
exports.default = new index_1.Model('producaoObs', 'producao_obs', campos, 1);

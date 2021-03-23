"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../index");
const campos = new Map();
campos.set('id', new index_1.CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('nome', new index_1.CampoString('nome', { obrigatorio: true, unico: true, tamanhoMaximo: 30 }));
exports.default = new index_1.Model('teste', 'teste', campos, 1, false);

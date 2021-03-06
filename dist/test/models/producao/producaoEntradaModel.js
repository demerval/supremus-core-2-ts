"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("supremus-core-2-../../../index");
const campos = new Map();
campos.set('id', new index_1.CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('data', new index_1.CampoDate('data', { obrigatorio: true }));
campos.set('hora', new index_1.CampoString('hora', { tamanhoMaximo: 5 }));
campos.set('idCliente', new index_1.CampoNumber('cod_cliente', { obrigatorio: true }));
campos.set('idMotorista', new index_1.CampoNumber('cod_motorista', { obrigatorio: true }));
campos.set('situacao', new index_1.CampoNumber('situacao'));
campos.set('usuario', new index_1.CampoString('usuario'));
exports.default = new index_1.Model('producaoEntrada', 'producao_entrada', campos, 2);

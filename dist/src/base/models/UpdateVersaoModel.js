"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../../model/Model"));
const CampoString_1 = __importDefault(require("../../campos/CampoString"));
const CampoNumber_1 = __importDefault(require("../../campos/CampoNumber"));
const campos = new Map();
campos.set('id', new CampoString_1.default('tabela', { obrigatorio: true, chavePrimaria: {} }));
campos.set('versaoUpdate', new CampoNumber_1.default('versao_update', { obrigatorio: true }));
exports.default = new Model_1.default('updateVersao', 'update_versao_2', campos, 1);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __importDefault(require("../../model/Model"));
var CampoString_1 = __importDefault(require("../../campos/CampoString"));
var CampoNumber_1 = __importDefault(require("../../campos/CampoNumber"));
var campos = new Map();
campos.set('id', new CampoString_1.default('tabela', { obrigatorio: true, chavePrimaria: {} }));
campos.set('versao', new CampoNumber_1.default('versao', { obrigatorio: true }));
var EstruturaVersaoModel = new Model_1.default('estruturaVersao', 'estrutura_versao', campos, 1);
exports.default = EstruturaVersaoModel;

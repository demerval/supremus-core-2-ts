"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("./Model"));
const CampoNumber_1 = __importDefault(require("../campos/CampoNumber"));
const CampoDate_1 = __importDefault(require("../campos/CampoDate"));
const CampoString_1 = __importDefault(require("../campos/CampoString"));
const CampoBoolean_1 = __importDefault(require("../campos/CampoBoolean"));
const campos = new Map();
campos.set('id', new CampoNumber_1.default('id', { chavePrimaria: { autoIncremento: true } }));
campos.set('dataCadastro', new CampoDate_1.default('data_cadastro', { obrigatorio: true }));
campos.set('nome', new CampoString_1.default('nome', { obrigatorio: true, unico: true }));
campos.set('senha', new CampoString_1.default('senha', { obrigatorio: true, password: true }));
campos.set('ativo', new CampoBoolean_1.default('ativo'));
describe('Testando model', () => {
    it('Geracao do map dos campos', () => {
        const model = new Model_1.default('cliente', 'clientes', campos, 1);
        const campo = model.getCampo('dataCadastro');
        expect(campo === null || campo === void 0 ? void 0 : campo.getNome()).toBe('data_cadastro');
    });
});

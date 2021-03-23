"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
const DAO_1 = __importDefault(require("./DAO"));
describe('Teste basico DAO', () => {
    it('Testar conexao com o banco de dados - Firebird', async () => {
        const dao = new DAO_1.default();
        await dao.openConexao();
        const isConexaoOpen = dao.isConexaoOpen();
        dao.closeConexao();
        expect(true).toBe(isConexaoOpen);
    });
    it('Testar conexao com o banco de dados com transacao - Firebird', async () => {
        const dao = new DAO_1.default();
        await dao.openConexao(true);
        const isTransactionOpen = dao.isTransacao();
        await dao.confirmarTransacao();
        dao.closeConexao();
        expect(true).toBe(isTransactionOpen);
    });
});

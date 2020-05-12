require('dotenv/config');

import DAO from "./DAO"

describe('Teste basico DAO', () => {

  it('Testar conexao com o banco de dados - Firebird', async () => {
    const dao = new DAO();
    await dao.openConexao();
    const isConexaoOpen = dao.isConexaoOpen();
    dao.closeConexao();
    expect(true).toBe(isConexaoOpen);
  });

  it('Testar conexao com o banco de dados com transacao - Firebird', async () => {
    const dao = new DAO();
    await dao.openConexao(true);
    const isTransactionOpen = dao.isTransacao();
    await dao.confirmarTransacao();
    dao.closeConexao();
    expect(true).toBe(isTransactionOpen);
  });

});
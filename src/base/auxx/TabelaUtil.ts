import DAO from '../../database/DAO';

export const TabelaUtil = {

  async tabelaExiste(dao: DAO, nomeTabela: string) {
    const sql = 'SELECT RDB$RELATION_NAME FROM RDB$RELATIONS WHERE RDB$RELATION_NAME = ?';

    const rows = await dao.executarSql(sql, [nomeTabela]);
    return (rows.length === 1);
  },

  async atualizarVersaoTabela(dao: DAO, config: { nomeTabela: string, versao: number, onEstruturaVerificada(dao: DAO): Promise<void> }) {
    let sql = 'UPDATE OR INSERT INTO ESTRUTURA_VERSAO '
      + '(TABELA, VERSAO) '
      + 'VALUES (?, ?) '
      + 'MATCHING (TABELA);';

    const ok = await dao.executarSql(sql, [config.nomeTabela, config.versao]);
    await config.onEstruturaVerificada(dao);

    return ok;
  },

}
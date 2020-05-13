import DAO from "../../database/DAO";
import { ChavePrimariaConfig } from "./EstruturaUtil";

export const ChavePrimariaUtil = {

  async criarChavePrimaria(dao: DAO, config: ChavePrimariaConfig) {
    const existe = await this.chavePrimariaExiste(dao, config.nomeTabela);
    if (existe === true) {
      return;
    }

    return await dao.executarSql(config.sql);
  },

  async chavePrimariaExiste(dao: DAO, nomeTabela: string) {
    let sql = "SELECT RDB$FIELD_NAME FROM RDB$RELATION_CONSTRAINTS C, RDB$INDEX_SEGMENTS S WHERE "
      + "C.RDB$CONSTRAINT_TYPE = 'PRIMARY KEY' AND S.RDB$INDEX_NAME = C.RDB$INDEX_NAME "
      + "AND RDB$RELATION_NAME = ?";

    const rows = await dao.executarSql(sql, [nomeTabela]);
    return (rows.length === 1);
  },

}
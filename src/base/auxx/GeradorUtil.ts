import DAO from "../../database/DAO";
import { GeradorConfig } from "./EstruturaUtil";

export const GeradorUtil = {

  async criarGerador(dao: DAO, config: GeradorConfig) {
    const existe = await this._geradorExiste(dao, config.nomeGerador);
    if (existe === true) {
      return;
    }

    return await dao.executarSql(config.sql);
  },

  async _geradorExiste(dao: DAO, nomeGerador: string) {
    let sql = "SELECT RDB$GENERATOR_NAME FROM RDB$GENERATORS "
      + "WHERE RDB$GENERATOR_NAME = ?";

    const rows = await dao.executarSql(sql, [nomeGerador]);
    return rows.length === 1;
  }

}
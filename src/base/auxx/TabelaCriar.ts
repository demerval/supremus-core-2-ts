import DAO from "../../database/DAO";
import { EstruturaConfig } from "./EstruturaUtil";
import { TabelaUtil } from "./TabelaUtil";
import { ChavePrimariaUtil } from "./ChavePrimariaUtil";
import { GeradorUtil } from "./GeradorUtil";

export const TabelaCriar = {

  async criar(dao: DAO, config: EstruturaConfig) {
    await dao.executarSql(config.configTabela!.sql);

    if (config.configChavePrimaria) {
      await ChavePrimariaUtil.criarChavePrimaria(dao, config.configChavePrimaria);
    }
    if (config.configGerador) {
      await GeradorUtil.criarGerador(dao, config.configGerador);
    }

    return await TabelaUtil.atualizarVersaoTabela(dao, config);
  }

}
import EstruturaVerificar from "./base/EstruturaVerificar";
import ModelManager from "./model/ModelManager";
import Model from "./model/Model";
import ModelPersiste, { ConfigPersist } from "./model/ModelPersite";
import DAO from "./database/DAO";
import Consulta from "./sql/Consulta";
import { ItemConsulta } from "./sql/SqlConsulta";
import CarregarModelsUtil from "./model/auxx/CarregarModelsUtil";

const SupremusCore = {

  async carregarModels(dirModels: string) {
    await new CarregarModelsUtil().verificarPastas(dirModels);
    await new EstruturaVerificar().verificar();

    return true;
  },

  addModel(model: Model) {
    ModelManager.addModel(model);
  },

  getModel(nome: string) {
    return ModelManager.getModel(nome.toLowerCase());
  },

  async modelPersiste(config: ConfigPersist, dao: DAO) {
    try {
      const result = await new ModelPersiste().persistir(config, dao);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultar(config: ItemConsulta | ItemConsulta[], dao: DAO) {
    try {
      if (config instanceof Array) {
        return await new Consulta().consultar(config, dao);
      }
      if (config.porId) {
        return await new Consulta().consultarPorId(config, dao);
      }
      if (config.paginado) {
        return await new Consulta().consultaPaginada(config, dao);
      }

      return await new Consulta().consultar(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

}

export default SupremusCore;

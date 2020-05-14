import EstruturaVerificar from "./base/EstruturaVerificar";
import ModelManager from "./model/ModelManager";
import Model from "./model/Model";
import ModelPersiste from "./model/ModelPersiste";
import DAO from "./database/DAO";
import Consulta from "./sql/Consulta";
import {Consulta as Base, Persistir} from "supremus-core-2-ts-base";
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

  async modelPersiste(config: Persistir.ConfigPersist, dao?: DAO) {
    try {
      const result = await new ModelPersiste().persistir(config, dao);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultar(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO): Promise<Record<string, any>[]> {
    try {
      return await new Consulta().consultar(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultarArray(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO): Promise<Record<string, any>> {
    try {
      return await new Consulta().consultarArray(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultarPorId(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO): Promise<Record<string, any> | undefined> {
    try {
      if (config instanceof Array) {
        throw new Error('Consulta por id não pode ser um array.');
      }

      return await new Consulta().consultarPorId(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultarPaginado(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO): Promise<{ totalReg: number, data: Record<string, any>[], resultFuncoes: Record<string, any>[] }> {
    try {
      if (config instanceof Array) {
        throw new Error('Consulta paginada não pode ser um array.');
      }

      return await new Consulta().consultaPaginada(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

}

export default SupremusCore;

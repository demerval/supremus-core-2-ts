import EstruturaVerificar from "./base/EstruturaVerificar";
import ModelManager from "./model/ModelManager";
import Model from "./model/Model";
import ModelPersiste, { ConfigPersist } from "./model/ModelPersiste";
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

  async modelPersiste(config: ConfigPersist, dao?: DAO) {
    try {
      const result = await new ModelPersiste().persistir(config, dao);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultar(config: ItemConsulta | ItemConsulta[], dao?: DAO): Promise<Record<string, any>[]> {
    try {
      return await new Consulta().consultar(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultarArray(config: ItemConsulta | ItemConsulta[], dao?: DAO): Promise<Record<string, any>> {
    try {
      return await new Consulta().consultarArray(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultarPorId(config: ItemConsulta | ItemConsulta[], dao?: DAO): Promise<Record<string, any> | undefined> {
    try {
      if (config instanceof Array) {
        throw new Error('Consulta por id não pode ser um array.');
      }

      if (config.porId === undefined) {
        throw new Error('Erro na configuração da consulta porId.');
      }

      return await new Consulta().consultarPorId(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

  async modelConsultarPaginado(config: ItemConsulta | ItemConsulta[], dao?: DAO): Promise<{ totalReg: number, data: Record<string, any>[] }> {
    try {
      if (config instanceof Array) {
        throw new Error('Consulta paginada não pode ser um array.');
      }

      if (config.paginado === undefined) {
        throw new Error('Erro na configuração da consulta paginada.');
      }

      return await new Consulta().consultaPaginada(config, dao);
    } catch (error) {
      throw new Error(error);
    }
  },

}

export default SupremusCore;

import Model from "./model/Model";
import { ConfigPersist } from "./model/ModelPersite";
import DAO from "./database/DAO";
import { ItemConsulta } from "./sql/SqlConsulta";
declare const SupremusCore: {
    carregarModels(dirModels: string): Promise<boolean>;
    addModel(model: Model): void;
    getModel(nome: string): Model;
    modelPersiste(config: ConfigPersist, dao: DAO): Promise<Record<string, any>>;
    modelConsultar(config: ItemConsulta | ItemConsulta[], dao: DAO): Promise<Record<string, any> | undefined>;
};
export default SupremusCore;

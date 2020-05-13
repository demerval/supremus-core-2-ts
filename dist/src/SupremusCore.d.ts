import Model from "./model/Model";
import { ConfigPersist } from "./model/ModelPersiste";
import DAO from "./database/DAO";
import { ItemConsulta } from "./sql/SqlConsulta";
declare const SupremusCore: {
    carregarModels(dirModels: string): Promise<boolean>;
    addModel(model: Model): void;
    getModel(nome: string): Model;
    modelPersiste(config: ConfigPersist, dao?: DAO | undefined): Promise<Record<string, any>>;
    modelConsultar(config: ItemConsulta | ItemConsulta[], dao?: DAO | undefined): Promise<Record<string, any>[]>;
    modelConsultarArray(config: ItemConsulta | ItemConsulta[], dao?: DAO | undefined): Promise<Record<string, any>>;
    modelConsultarPorId(config: ItemConsulta | ItemConsulta[], dao?: DAO | undefined): Promise<Record<string, any> | undefined>;
    modelConsultarPaginado(config: ItemConsulta | ItemConsulta[], dao?: DAO | undefined): Promise<{
        totalReg: number;
        data: Record<string, any>[];
    }>;
};
export default SupremusCore;

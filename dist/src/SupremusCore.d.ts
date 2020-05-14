import Model from "./model/Model";
import { ConfigPersist } from "./model/ModelPersiste";
import DAO from "./database/DAO";
import { Consulta as Base } from "supremus-core-2-ts-base";
declare const SupremusCore: {
    carregarModels(dirModels: string): Promise<boolean>;
    addModel(model: Model): void;
    getModel(nome: string): Model;
    modelPersiste(config: ConfigPersist, dao?: DAO | undefined): Promise<Record<string, any>>;
    modelConsultar(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO | undefined): Promise<Record<string, any>[]>;
    modelConsultarArray(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO | undefined): Promise<Record<string, any>>;
    modelConsultarPorId(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO | undefined): Promise<Record<string, any> | undefined>;
    modelConsultarPaginado(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO | undefined): Promise<{
        totalReg: number;
        data: Record<string, any>[];
        resultFuncoes: Record<string, any>[];
    }>;
};
export default SupremusCore;

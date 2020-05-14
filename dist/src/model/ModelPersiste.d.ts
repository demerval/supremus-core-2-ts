import DAO from "../database/DAO";
import { Consulta as Base, Enums } from "supremus-core-2-ts-base";
export interface ConfigPersist {
    persistir: ItemPersist[];
    consultar?: ItemPersitConsulta[];
}
export interface ItemPersist {
    id: string;
    status: Enums.Status;
    dados: any;
}
export interface ItemPersitConsulta extends Base.ItemConsulta {
    idConsulta?: {
        campo: string;
        campoResult: [string, string];
    };
}
declare class ModelPersiste {
    persistir(config: ConfigPersist, dao?: DAO): Promise<Record<string, any>>;
}
export default ModelPersiste;

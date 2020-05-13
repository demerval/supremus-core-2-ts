import { Status } from "../enums";
import DAO from "../database/DAO";
import { ItemConsulta } from "../sql/SqlConsulta";
export interface ConfigPersist {
    persistir: ItemPersist[];
    consultar?: ItemPersitConsulta[];
}
export interface ItemPersist {
    id: string;
    status: Status;
    dados: any;
}
export interface ItemPersitConsulta extends ItemConsulta {
    idConsulta?: {
        campo: string;
        campoResult: [string, string];
    };
}
declare class ModelPersiste {
    persistir(config: ConfigPersist, dao?: DAO): Promise<Record<string, any>>;
}
export default ModelPersiste;

import DAO from "../database/DAO";
import { ItemConsulta, SubConsulta } from "./SqlConsulta";
import { FieldType } from "../enums";
declare class Consulta {
    consultar(config: ItemConsulta | ItemConsulta[], dao: DAO): Promise<Record<string, any>>;
    consultarPorId(config: ItemConsulta, dao: DAO): Promise<Record<string, any> | undefined>;
    consultaPaginada(config: ItemConsulta, dao: DAO): Promise<{
        totalReg: number;
        data: Record<string, any>[];
    }>;
    _subConsulta(dao: DAO, campos: [string, string, string, string, FieldType][], subConsultas: SubConsulta[], rows: any[]): Promise<void>;
}
export default Consulta;

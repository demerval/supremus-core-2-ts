import DAO from '../database/DAO';
import { Consulta as Base } from 'supremus-core-2-ts-base';
declare class Consulta {
    consultar(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO): Promise<Record<string, any>[]>;
    consultarArray(config: Base.ItemConsulta | Base.ItemConsulta[], dao?: DAO): Promise<Record<string, any>>;
    consultarPorId(config: Base.ItemConsulta, dao?: DAO): Promise<Record<string, any> | undefined>;
    consultaPaginada(config: Base.ItemConsulta, dao?: DAO): Promise<{
        totalReg: number;
        data: Record<string, any>[];
        resultFuncoes: Record<string, any>[];
    }>;
    consultarSql(config: Base.ConsultaSql | Base.ConsultaSql[], dao?: DAO): Promise<Record<string, any>>;
    _subConsulta(dao: DAO, campos: Base.CampoConsulta[], subConsultas: Base.SubConsulta[], rows: any[]): Promise<void>;
}
export default Consulta;

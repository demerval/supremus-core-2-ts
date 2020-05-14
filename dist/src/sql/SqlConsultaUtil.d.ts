import { Consulta as Base } from "supremus-core-2-ts-base";
import Model from "../model/Model";
declare class SqlConsultaUtil {
    getCriterio(configs: Map<string, Base.SqlConsultaConfig>): string | undefined;
    getDadosCriterio(key: string, model: Model, criterio: Base.CampoCriterio): string;
    getDadosOrdem(configs: Map<string, Base.SqlConsultaConfig>, ordem?: string[]): string | undefined;
}
export default SqlConsultaUtil;

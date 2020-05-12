import { SqlConsultaConfig, CampoCriterio } from "./SqlConsulta";
import Model from "../model/Model";
declare class SqlConsultaUtil {
    getCriterio(configs: Map<string, SqlConsultaConfig>): string | undefined;
    getDadosCriterio(key: string, model: Model, criterio: CampoCriterio): string;
    getDadosOrdem(configs: Map<string, SqlConsultaConfig>, ordem?: string[]): string | undefined;
}
export default SqlConsultaUtil;

import { Consulta as Base } from 'supremus-core-2-ts-base';
declare class SqlConsulta {
    private sqlUtil;
    private configs;
    constructor();
    getDadosConsulta(config: Base.ItemConsulta, isPaginado?: boolean, subConsulta?: Base.SubConsultaConfig): Base.ConsultaConfig;
    getDados(config: Base.ItemConsulta, subConsulta?: Base.SubConsultaConfig): {
        tabela: string;
        dadosCampos: {
            agrupar: boolean;
            campos: Base.CampoConsulta[];
        };
        joins: any[] | undefined;
        criterio: string | undefined;
        ordem: string | undefined;
    };
    getDadosJoin(config: Base.ItemJoinConsulta): {
        join: string;
        dadosCampos: {
            agrupar: boolean;
            campos: Base.CampoConsulta[];
        };
    };
    _getCampoJoin(campo: [string, string]): string;
    _getCampo(key: string, campos: Base.CampoConsulta[]): string;
    _getValor(key: string, subConsulta: Base.SubConsultaConfig): any;
    _getCampoModel(key: string, nomeCampo: string): import("../campos/abstract/Campo").default;
}
export default SqlConsulta;

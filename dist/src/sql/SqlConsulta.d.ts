import { Consulta as Base, Enums } from 'supremus-core-2-ts-base';
declare class SqlConsulta {
    private sqlUtil;
    private configs;
    constructor();
    getDadosConsulta(config: Base.ItemConsulta, isPaginado?: boolean, subConsulta?: Base.SubConsultaConfig): Base.ConsultaConfig;
    getDados(config: Base.ItemConsulta, subConsulta?: Base.SubConsultaConfig): {
        tabela: string;
        campos: [string, string, string, string, Enums.FieldType][];
        joins: any[] | undefined;
        criterio: string | undefined;
        ordem: string | undefined;
    };
    getDadosJoin(config: Base.ItemJoinConsulta): {
        join: string;
        campos: [string, string, string, string, Enums.FieldType][];
    };
    _getCampoJoin(campo: [string, string]): string;
    _getCampo(key: string, campos: [string, string, string, string, Enums.FieldType][]): string;
    _getValor(key: string, subConsulta: Base.SubConsultaConfig): any;
    _getCampoModel(key: string, nomeCampo: string): import("../campos/abstract/Campo").default;
}
export default SqlConsulta;

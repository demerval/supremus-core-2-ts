import { FieldType } from "../enums";
export interface ItemConsulta {
    key: string;
    tabela: string;
    campos?: string[];
    joins?: ItemJoinConsulta[];
    criterios?: CampoCriterio[];
    ordem?: string[];
    subConsultas?: SubConsulta[];
    paginado?: {
        pagina: number;
        qtdeRegistros: number;
    };
    porId?: {
        id: any;
    };
}
export interface ItemJoinConsulta {
    key: string;
    tabela: string;
    campos?: string[];
    joinTipo?: 'inner' | 'left' | 'right';
    joinOn: [string, [string, string]];
    criterios?: CampoCriterio[];
}
export interface CampoCriterio {
    campo: string;
    valor: any;
    operador?: string;
    comparador?: 'and' | 'or';
}
export interface SubConsulta extends ItemConsulta {
    link: [string, string];
}
export interface SqlConsultaConfig {
    tabela: string;
    criterios?: CampoCriterio[];
}
export interface SubConsultaConfig {
    link: [string, string];
    campos: [string, string, string, string, FieldType][];
    row: Record<string, any>;
}
export interface ConsultaConfig {
    configs: Map<string, SqlConsultaConfig>;
    campos: [string, string, string, string, FieldType][];
    sql: string;
    sqlTotal?: string;
}
declare class SqlConsulta {
    private sqlUtil;
    private configs;
    constructor();
    getDadosConsulta(config: ItemConsulta, isPaginado?: boolean, subConsulta?: SubConsultaConfig): ConsultaConfig;
    getDados(config: ItemConsulta, subConsulta?: SubConsultaConfig): {
        tabela: string;
        campos: [string, string, string, string, FieldType][];
        joins: any[] | undefined;
        criterio: string | undefined;
        ordem: string | undefined;
    };
    getDadosJoin(config: ItemJoinConsulta): {
        join: string;
        campos: [string, string, string, string, FieldType][];
    };
    _getCampoJoin(campo: [string, string]): string;
    _getCampo(key: string, campos: [string, string, string, string, FieldType][]): string;
    _getValor(key: string, subConsulta: SubConsultaConfig): any;
}
export default SqlConsulta;

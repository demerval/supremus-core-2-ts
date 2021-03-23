export declare type Operador = '=' | '>' | '<' | '<>' | '>=' | '<=' | 'LIKE' | 'BETWEEN';
export declare type Comparador = 'and' | 'or';
export declare type OrdemTipo = 'asc' | 'desc';
export declare type JoinTipo = 'inner' | 'left' | 'right';
export interface Criterio {
    campo: string;
    valor: any;
    operador: Operador;
    comparador: Comparador;
}
export interface Ordem {
    campo: string;
    ordem: OrdemTipo;
}
export declare type Criterios = Criterio | Criterio[];
declare class STConfig {
    private _key;
    private _model;
    private _joinTipo;
    private _joinOn;
    private _campos;
    private _criterios;
    private _ordens;
    get key(): string;
    set key(key: string);
    get model(): string;
    set model(tabela: string);
    get joinTipo(): JoinTipo;
    set joinTipo(tipo: JoinTipo);
    get joinOn(): [string, string] | null;
    set joinOn(joinOn: [string, string] | null);
    get campos(): string[];
    get criterios(): Criterios[];
    get ordens(): Ordem[];
    addCampo(campo: string | string[]): void;
    addCriterio(criterio: Criterios): void;
    addOrdem(ordem: Ordem | Ordem[]): void;
}
export default STConfig;

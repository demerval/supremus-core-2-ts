import STConfig, { Comparador, Criterios, JoinTipo, Operador } from './STConfig';
declare type GroupCriterioFunction = (st: STQuery) => void;
declare type JoinFunction = (st: STQuery) => void;
declare class STQuery {
    private _config;
    private _configJoin;
    model(nomeModel: string): STQuery;
    join(nomeModel: string, on: [string, string], joinFunc?: JoinFunction): STQuery;
    joinTipo(tipo: JoinTipo): STQuery;
    campos(campo: string | string[]): STQuery;
    criterioAnd(campo: string, valor: any, operador?: Operador): STQuery;
    criterioOr(campo: string, valor: any, operador?: Operador): STQuery;
    criterioGroup(GroupCriterioFunc: GroupCriterioFunction): STQuery;
    criterioBetween(campo: string, valor: [any, any], comparador?: Comparador): STQuery;
    criterio(campo: string, valor: any, operador?: Operador, comparador?: Comparador): STQuery;
    ordem(campo: string, ordem?: 'asc' | 'desc'): STQuery;
    get criterios(): Criterios[];
    get config(): STConfig;
    get configJoin(): STConfig[];
}
export default STQuery;

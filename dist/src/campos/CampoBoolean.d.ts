import Campo, { CampoConfig, Dados } from './abstract/Campo';
declare class CampoBoolean extends Campo {
    constructor(nome: string, config?: CampoConfig);
    getDados(valor: any, key: string): Dados;
    getValorSql(valor: any): string;
}
export default CampoBoolean;

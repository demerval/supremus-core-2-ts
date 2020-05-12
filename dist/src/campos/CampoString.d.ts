import Campo, { CampoConfig, Dados } from './abstract/Campo';
interface CampoStringConfig extends CampoConfig {
    password?: boolean;
}
declare class CampoString extends Campo {
    private password;
    constructor(nome: string, config: CampoStringConfig);
    getDados(valor: any, key: string): Dados;
    getValorSql(valor: any): string;
}
export default CampoString;

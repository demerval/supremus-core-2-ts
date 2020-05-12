import Campo, { CampoConfig, Dados } from './abstract/Campo';
interface CampoDateConfig extends CampoConfig {
    dataUpdate?: boolean;
}
declare class CampoDate extends Campo {
    private dataUpdate;
    constructor(nome: string, config?: CampoDateConfig);
    isDateUpdate(): boolean;
    getDados(valor: any, key: string): Dados;
    getValorSql(valor: any): string;
}
export default CampoDate;

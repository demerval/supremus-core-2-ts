import Campo, { CampoConfig, Dados } from './abstract/Campo';
import { FieldType } from '../enums';
interface CampoDateConfig extends CampoConfig {
    tipo?: FieldType;
}
declare class CampoNumber extends Campo {
    constructor(nome: string, config?: CampoDateConfig);
    getDados(valor: any, key: string): Dados;
    getValorSql(valor: any): string;
}
export default CampoNumber;

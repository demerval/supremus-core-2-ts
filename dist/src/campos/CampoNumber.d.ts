import Campo, { CampoConfig, Dados } from './abstract/Campo';
import { Enums } from 'supremus-core-2-ts-base';
interface CampoDateConfig extends CampoConfig {
    tipo?: Enums.FieldType;
}
declare class CampoNumber extends Campo {
    constructor(nome: string, config?: CampoDateConfig);
    getDados(valor: any, key: string): Dados;
    getValorSql(valor: any): string;
}
export default CampoNumber;

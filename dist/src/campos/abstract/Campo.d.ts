import { FieldType, CaseType } from '../../enums';
import { ChavePrimaria } from '../interfaces/ChavePrimaria';
import { ChaveEstrangeira } from '../interfaces/ChaveEstrangeira';
export interface CampoConfig {
    chavePrimaria?: ChavePrimaria;
    chaveEstrangeira?: ChaveEstrangeira;
    tipoCaracter?: CaseType;
    decimal?: number;
    obrigatorio?: boolean;
    unico?: boolean;
    tamanhoMinimo?: number;
    tamanhoMaximo?: number;
    valorPadrao?: any;
    naoReplicar?: boolean;
}
export declare type Dados = [string, string, any, boolean, boolean, FieldType];
declare abstract class Campo {
    private nome;
    private tipo;
    private config;
    constructor(nome: string);
    configure(tipo: FieldType, config?: CampoConfig): void;
    static FieldType(): typeof FieldType;
    getNome(): string;
    getTipo(): FieldType;
    isChavePrimaria(): boolean;
    getChavePrimaria(): ChavePrimaria | undefined;
    isChaveEstrangeira(): boolean;
    isNaoReplicar(): boolean | undefined;
    getChaveEstrangeira(): ChaveEstrangeira | undefined;
    getTipoCaracter(): CaseType | undefined;
    getDecimal(): number | undefined;
    isObrigatorio(): boolean;
    isUnico(): boolean;
    getValorPadrao(): any;
    getTamanhoMinimo(): number;
    getTamanhoMaximo(): number;
    abstract getDados(valor: any, key: string): Dados;
    abstract getValorSql(valor: any): string;
}
export default Campo;

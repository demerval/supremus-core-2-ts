import { Enums } from 'supremus-core-2-ts-base';
import { ChavePrimaria } from '../interfaces/ChavePrimaria';
import { ChaveEstrangeira } from '../interfaces/ChaveEstrangeira';
export interface CampoConfig {
    chavePrimaria?: ChavePrimaria;
    chaveEstrangeira?: ChaveEstrangeira;
    tipoCaracter?: Enums.CaseType;
    decimal?: number;
    obrigatorio?: boolean;
    unico?: boolean;
    tamanhoMinimo?: number;
    tamanhoMaximo?: number;
    valorPadrao?: any;
    naoReplicar?: boolean;
}
export declare type Dados = [string, string, any, boolean, boolean, Enums.FieldType];
declare abstract class Campo {
    private nome;
    private tipo;
    private config;
    constructor(nome: string);
    configure(tipo: Enums.FieldType, config?: CampoConfig): void;
    static FieldType(): typeof Enums.FieldType;
    getNome(): string;
    getTipo(): Enums.FieldType;
    isChavePrimaria(): boolean;
    getChavePrimaria(): ChavePrimaria | undefined;
    isChaveEstrangeira(): boolean;
    isNaoReplicar(): boolean | undefined;
    getChaveEstrangeira(): ChaveEstrangeira | undefined;
    getTipoCaracter(): Enums.CaseType | undefined;
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

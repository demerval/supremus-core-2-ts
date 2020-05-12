import Campo, { Dados } from '../campos/abstract/Campo';
import DAO from '../database/DAO';
import { Status, FieldType } from '../enums';
declare class Model {
    private nome;
    private nomeTabela;
    private campos;
    private versao;
    private verificar;
    constructor(nome: String, nomeTabela: String, campos: Map<string, Campo>, versao?: number, verificar?: boolean);
    isVerificar(): boolean;
    getNome(): string;
    getNomeTabela(): string;
    getCampos(): Map<string, Campo>;
    getCampo(nome: string): Campo | undefined;
    getVersao(): number;
    getChavePrimaria(): [string, Campo];
    getDados(dados: any): Dados[];
    getCamposConsulta(key: string, campos?: string[]): [string, string, string, string, FieldType][];
    onEstruturaVerificada(dao: DAO): Promise<void>;
    onDadosCarregado(item: any): Promise<void>;
    onAntesPersistir(dao: DAO, item: any, status: Status): Promise<void>;
    onDepoisPersistir(dao: DAO, item: any, status: Status): Promise<void>;
}
export default Model;

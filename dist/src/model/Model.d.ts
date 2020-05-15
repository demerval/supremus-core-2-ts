import Campo, { Dados } from '../campos/abstract/Campo';
import DAO from '../database/DAO';
import { Consulta as Base, Enums } from 'supremus-core-2-ts-base';
declare class Model {
    private nome;
    private nomeTabela;
    private campos;
    private versao;
    private verificar;
    constructor(nome: String, nomeTabela: String, campos: Map<string, Campo>, versao?: number, verificar?: boolean);
    addCampo(nome: string, campo: Campo): void;
    isVerificar(): boolean;
    getNome(): string;
    getNomeTabela(): string;
    getCampos(): Map<string, Campo>;
    getCampo(nome: string): Campo | undefined;
    getVersao(): number;
    getChavePrimaria(): [string, Campo];
    getDados(dados: any): Dados[];
    getCamposConsulta(key: string, campos?: (string | Base.CampoFuncao)[]): {
        agrupar: boolean;
        campos: Base.CampoConsulta[];
    };
    onEstruturaVerificada(dao: DAO): Promise<void>;
    onDadosCarregado(item: any): Promise<void>;
    onAntesPersistir(dao: DAO, item: any, status: Enums.Status): Promise<void>;
    onDepoisPersistir(dao: DAO, item: any, status: Enums.Status): Promise<void>;
}
export default Model;

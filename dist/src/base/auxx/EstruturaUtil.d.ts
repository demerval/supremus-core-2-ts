import Model from '../../model/Model';
import Campo from '../../campos/abstract/Campo';
import DAO from '../../database/DAO';
export interface ChavePrimariaConfig {
    nomeTabela: string;
    sql: string;
}
export interface GeradorConfig {
    nomeGerador: string;
    sql: string;
}
export interface ChaveEstrangeiraConfig {
    nomeTabela: string;
    nomeTabelaFk: string;
    nomeCampoFk: string;
    nomeCampoTabelaFk: string;
    onUpdate: string;
    onDelete: string;
}
export interface EstruturaConfig {
    nomeTabela: string;
    versao: number;
    campos: Map<string, Campo>;
    configTabela?: {
        sql: string;
    };
    configChavePrimaria?: ChavePrimariaConfig;
    configGerador?: GeradorConfig;
    configChaveEstrangeira: ChaveEstrangeiraConfig[];
    onEstruturaVerificada(dao: DAO): Promise<void>;
}
declare class EstruturaUtil {
    prepare(model: Model): EstruturaConfig;
    private criarSql;
}
export default EstruturaUtil;

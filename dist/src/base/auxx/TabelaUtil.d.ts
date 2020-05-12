import DAO from '../../database/DAO';
export declare const TabelaUtil: {
    tabelaExiste(dao: DAO, nomeTabela: string): Promise<boolean>;
    atualizarVersaoTabela(dao: DAO, config: {
        nomeTabela: string;
        versao: number;
        onEstruturaVerificada(dao: DAO): Promise<void>;
    }): Promise<any[]>;
};

import DAO from '../../database/DAO';
import { EstruturaConfig } from './EstruturaUtil';
import Campo from '../../campos/abstract/Campo';
export declare const TabelaAjustar: {
    verificarTabela(dao: DAO, config: EstruturaConfig): Promise<true | any[]>;
    ajustarTabela(dao: DAO, config: EstruturaConfig): Promise<boolean>;
    verificarCampo(dao: DAO, config: EstruturaConfig, campo: Campo): Promise<boolean>;
    criarCampo(dao: DAO, config: EstruturaConfig, campo: Campo): Promise<boolean>;
    ajustarCampo(dao: DAO, nomeTabela: string, campo: Campo): Promise<boolean>;
    verificarTamanhoCampo(dao: DAO, nomeTabela: string, campo: Campo): Promise<boolean>;
};
export default TabelaAjustar;

import DAO from '../database/DAO';
declare const ModelUpdateVersaoUtil: {
    getModelVersao(dao: DAO, id: any): Promise<Record<string, any>>;
    atualizarVersao(dao: DAO, model: any): Promise<boolean>;
};
export default ModelUpdateVersaoUtil;

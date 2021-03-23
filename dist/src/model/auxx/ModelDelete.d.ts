import DAO from '../../database/DAO';
import Model from '../Model';
import { Dados } from '../../campos/abstract/Campo';
export declare const ModelDelete: {
    persiste(dao: DAO, model: Model, dados: Dados[]): Promise<Record<string, any>>;
};

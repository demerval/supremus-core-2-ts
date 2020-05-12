import DAO from "../../database/DAO";
import { Status } from "../../enums";
import Campo from "../../campos/abstract/Campo";
export declare const ModelUtil: {
    validarInsertUpdate(dao: DAO, nomeTabela: string, dados: any, status: Status, campoChave?: [string, Campo] | undefined): Promise<boolean>;
};

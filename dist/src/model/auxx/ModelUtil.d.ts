import DAO from "../../database/DAO";
import { Enums } from "supremus-core-2-ts-base";
import Campo from "../../campos/abstract/Campo";
export declare const ModelUtil: {
    validarInsertUpdate(dao: DAO, nomeTabela: string, dados: any, status: Enums.Status, campoChave?: [string, Campo] | undefined): Promise<boolean>;
};

import DAO from "../../database/DAO";
import { ChavePrimariaConfig } from "./EstruturaUtil";
export declare const ChavePrimariaUtil: {
    criarChavePrimaria(dao: DAO, config: ChavePrimariaConfig): Promise<any[] | undefined>;
    chavePrimariaExiste(dao: DAO, nomeTabela: string): Promise<boolean>;
};

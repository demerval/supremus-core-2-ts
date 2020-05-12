import DAO from "../../database/DAO";
import { ChaveEstrangeiraConfig } from "./EstruturaUtil";
export declare const ChaveEstrangeiraUtil: {
    criar(dao: DAO, chavesEstrangeiras: ChaveEstrangeiraConfig[]): Promise<boolean>;
    verificarChaveEstrangeiraExiste(dao: DAO, nomeTabela: string, campo: string): Promise<boolean>;
    _indiceChaveEstrangeira(dao: DAO, nomeTabela: string): Promise<number>;
};

import DAO from "../../database/DAO";
import { GeradorConfig } from "./EstruturaUtil";
export declare const GeradorUtil: {
    criarGerador(dao: DAO, config: GeradorConfig): Promise<any[] | undefined>;
    _geradorExiste(dao: DAO, nomeGerador: string): Promise<boolean>;
};

import DAO from "../../database/DAO";
import { EstruturaConfig } from "./EstruturaUtil";
export declare const TabelaCriar: {
    criar(dao: DAO, config: EstruturaConfig): Promise<any[]>;
};

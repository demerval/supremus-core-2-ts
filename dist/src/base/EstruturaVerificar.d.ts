import { EstruturaConfig } from "./auxx/EstruturaUtil";
declare class EstruturaVerificar {
    private dao;
    constructor();
    verificar(verificarPadrao?: boolean): Promise<void>;
    _verificarTabelasUpdate(): Promise<void>;
    _executarVerificacao(config: EstruturaConfig): Promise<boolean>;
}
export default EstruturaVerificar;

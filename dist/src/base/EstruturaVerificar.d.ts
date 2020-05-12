import { EstruturaConfig } from "./auxx/EstruturaUtil";
declare class EstruturaVerificar {
    private dao;
    constructor();
    verificar(): Promise<void>;
    _verificarTabelasUpdate(): Promise<void>;
    _executarVerificacao(config: EstruturaConfig): Promise<void>;
}
export default EstruturaVerificar;

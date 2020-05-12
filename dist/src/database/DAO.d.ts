import { Options } from 'node-firebird';
declare class DAO {
    private configDb?;
    private fb;
    private db?;
    private transaction?;
    constructor(configDb?: Options);
    openConexao(openTransacao?: boolean): Promise<unknown>;
    isConexaoOpen(): boolean;
    isTransacao(): boolean;
    executarSql(sql: string, params?: any): Promise<any[]>;
    confirmarTransacao(): Promise<unknown>;
    closeConexao(): void;
    gerarId(generatorName: string): Promise<any>;
}
export default DAO;

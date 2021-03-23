import STConfig from './STConfig';
declare class STQueryBuilder {
    private config;
    private configJoin;
    private keys;
    constructor(config: STConfig, configJoin: STConfig[]);
    getSql(): string;
    private getDados;
}
export default STQueryBuilder;

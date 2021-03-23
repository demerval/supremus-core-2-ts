"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelManager_1 = __importDefault(require("../../model/ModelManager"));
const STCampoFactory_1 = __importDefault(require("./STCampoFactory"));
const STCriterioFactory_1 = __importDefault(require("./STCriterioFactory"));
const STJoinFactory_1 = __importDefault(require("./STJoinFactory"));
const STOrdemFactory_1 = __importDefault(require("./STOrdemFactory"));
class STQueryBuilder {
    constructor(config, configJoin) {
        this.keys = new Map();
        this.config = config;
        this.configJoin = configJoin;
    }
    getSql() {
        const model = ModelManager_1.default.getModel(this.config.model);
        const key = this.config.key;
        const tabela = model.getNomeTabela();
        let { campos, criterios, ordem } = this.getDados(model, this.config);
        let join = '';
        this.keys.set(model.getNome(), key);
        this.configJoin.forEach(c => {
            const modelJoin = ModelManager_1.default.getModel(c.model);
            this.keys.set(modelJoin.getNome(), c.key);
            const { campos: cj, criterios: ccj, ordem: oj, join: jj } = this.getDados(modelJoin, c);
            if (cj !== null) {
                campos += `, ${cj}`;
            }
            if (ccj !== null) {
                criterios += ` and ${ccj}`;
            }
            if (oj !== null) {
                ordem += `, ${oj}`;
            }
            if (jj !== null) {
                join += ` ${jj}`;
            }
        });
        let sql = `select ${campos} from ${tabela} ${key}`;
        if (join !== '') {
            sql += join;
        }
        if (criterios !== null) {
            sql += ` where ${criterios}`;
        }
        if (ordem !== null) {
            sql += ` order by ${ordem};`;
        }
        return sql.toUpperCase();
    }
    getDados(model, config) {
        const campos = STCampoFactory_1.default(model, config.key, config.campos);
        const criterios = STCriterioFactory_1.default(model, config.key, config.criterios);
        const ordem = STOrdemFactory_1.default(model, config.key, config.ordens);
        const join = STJoinFactory_1.default(model, config, this.keys);
        return {
            campos,
            criterios,
            ordem,
            join,
        };
    }
}
exports.default = STQueryBuilder;

import Model from '../../model/Model';
import ModelManager from '../../model/ModelManager';
import STCampoFactory from './STCampoFactory';
import STConfig from './STConfig';
import STCriterioFactory from './STCriterioFactory';
import STJoinFactory from './STJoinFactory';
import STOrdemFactory from './STOrdemFactory';

class STQueryBuilder {
  private config: STConfig;
  private configJoin: STConfig[];
  private keys: Map<string, string> = new Map();

  constructor(config: STConfig, configJoin: STConfig[]) {
    this.config = config;
    this.configJoin = configJoin;
  }

  getSql(): string {
    const model = ModelManager.getModel(this.config.model);
    const key = this.config.key;
    const tabela = model.getNomeTabela();
    let { campos, criterios, ordem } = this.getDados(model, this.config);
    let join = '';

    this.keys.set(model.getNome(), key);

    this.configJoin.forEach(c => {
      const modelJoin = ModelManager.getModel(c.model);
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

  private getDados(model: Model, config: STConfig) {
    const campos = STCampoFactory(model, config.key, config.campos);
    const criterios = STCriterioFactory(model, config.key, config.criterios);
    const ordem = STOrdemFactory(model, config.key, config.ordens);
    const join = STJoinFactory(model, config, this.keys);

    return {
      campos,
      criterios,
      ordem,
      join,
    };
  }
}

export default STQueryBuilder;

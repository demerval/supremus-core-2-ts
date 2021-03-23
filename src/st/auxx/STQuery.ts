import STConfig, { Comparador, Criterio, Criterios, JoinTipo, Operador } from './STConfig';
import STKey from './STKey';

type GroupCriterioFunction = (st: STQuery) => void;
type JoinFunction = (st: STQuery) => void;

class STQuery {
  private _config: STConfig = new STConfig();
  private _configJoin: STConfig[] = [];

  model(nomeModel: string): STQuery {
    this._config.model = nomeModel;
    this._config.key = STKey(0);
    return this;
  }

  join(nomeModel: string, on: [string, string], joinFunc?: JoinFunction): STQuery {
    const stq = new STQuery();
    stq._config.model = nomeModel;
    stq._config.key = STKey(this._configJoin.length + 1);
    stq._config.joinTipo = 'inner';
    stq._config.joinOn = on;

    if (joinFunc) {
      joinFunc(stq);
    }

    this._configJoin.push(stq._config);

    return this;
  }

  joinTipo(tipo: JoinTipo): STQuery {
    this._config.joinTipo = tipo;
    return this;
  }

  campos(...campo: string[]): STQuery {
    this._config.addCampo(campo);
    return this;
  }

  criterioAnd(campo: string, valor: any, operador: Operador = '='): STQuery {
    return this.criterio(campo, valor, operador, 'and');
  }

  criterioOr(campo: string, valor: any, operador: Operador = '='): STQuery {
    return this.criterio(campo, valor, operador, 'or');
  }

  criterioGroup(GroupCriterioFunc: GroupCriterioFunction): STQuery {
    const stq = new STQuery();
    GroupCriterioFunc(stq);

    const criterios: Criterio[] = [];
    stq.criterios.forEach(c => {
      criterios.push(c as Criterio);
    });
    this._config.addCriterio(criterios);
    return this;
  }

  criterioBetween(campo: string, valor: [any, any], comparador: Comparador = 'and'): STQuery {
    this._config.addCriterio({ campo, valor, operador: 'BETWEEN', comparador });
    return this;
  }

  criterio(campo: string, valor: any, operador: Operador = '=', comparador: Comparador = 'and'): STQuery {
    this._config.addCriterio({ campo, valor, operador, comparador });
    return this;
  }

  ordem(campo: string, ordem: 'asc' | 'desc' = 'asc'): STQuery {
    this._config.addOrdem({ campo, ordem });
    return this;
  }

  get criterios(): Criterios[] {
    return this._config.criterios;
  }

  get config(): STConfig {
    return this._config;
  }

  get configJoin(): STConfig[] {
    return this._configJoin;
  }
}

export default STQuery;

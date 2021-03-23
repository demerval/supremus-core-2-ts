export type Operador = '=' | '>' | '<' | '<>' | '>=' | '<=' | 'LIKE' | 'BETWEEN';
export type Comparador = 'and' | 'or';
export type OrdemTipo = 'asc' | 'desc';
export type JoinTipo = 'inner' | 'left' | 'right';

export interface Criterio {
  campo: string;
  valor: any;
  operador: Operador;
  comparador: Comparador;
}

export interface Ordem {
  campo: string;
  ordem: OrdemTipo;
}

export type Criterios = Criterio | Criterio[];

class STConfig {
  private _key = 'a';
  private _model = '';
  private _joinTipo: JoinTipo = 'inner';
  private _joinOn: [string, string] | null = null;
  private _campos: string[] = [];
  private _criterios: Criterios[] = [];
  private _ordens: Ordem[] = [];

  get key(): string {
    return this._key;
  }

  set key(key: string) {
    this._key = key;
  }

  get model(): string {
    return this._model;
  }

  set model(tabela: string) {
    this._model = tabela;
  }

  get joinTipo(): JoinTipo {
    return this._joinTipo;
  }

  set joinTipo(tipo: JoinTipo) {
    this._joinTipo = tipo;
  }

  get joinOn(): [string, string] | null {
    return this._joinOn;
  }

  set joinOn(joinOn: [string, string] | null) {
    this._joinOn = joinOn;
  }

  get campos(): string[] {
    return this._campos;
  }

  get criterios(): Criterios[] {
    return this._criterios;
  }

  get ordens(): Ordem[] {
    return this._ordens;
  }

  addCampo(campo: string | string[]) {
    if (campo instanceof Array) {
      this._campos.push(...campo);
    } else {
      this._campos.push(campo);
    }
  }

  addCriterio(criterio: Criterios) {
    this._criterios.push(criterio);
  }

  addOrdem(ordem: Ordem | Ordem[]) {
    if (ordem instanceof Array) {
      this._ordens.push(...ordem);
    } else {
      this._ordens.push(ordem);
    }
  }
}

export default STConfig;

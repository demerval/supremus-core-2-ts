"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class STConfig {
    constructor() {
        this._key = 'a';
        this._model = '';
        this._joinTipo = 'inner';
        this._joinOn = null;
        this._campos = [];
        this._criterios = [];
        this._ordens = [];
    }
    get key() {
        return this._key;
    }
    set key(key) {
        this._key = key;
    }
    get model() {
        return this._model;
    }
    set model(tabela) {
        this._model = tabela;
    }
    get joinTipo() {
        return this._joinTipo;
    }
    set joinTipo(tipo) {
        this._joinTipo = tipo;
    }
    get joinOn() {
        return this._joinOn;
    }
    set joinOn(joinOn) {
        this._joinOn = joinOn;
    }
    get campos() {
        return this._campos;
    }
    get criterios() {
        return this._criterios;
    }
    get ordens() {
        return this._ordens;
    }
    addCampo(campo) {
        if (campo instanceof Array) {
            this._campos.push(...campo);
        }
        else {
            this._campos.push(campo);
        }
    }
    addCriterio(criterio) {
        this._criterios.push(criterio);
    }
    addOrdem(ordem) {
        if (ordem instanceof Array) {
            this._ordens.push(...ordem);
        }
        else {
            this._ordens.push(ordem);
        }
    }
}
exports.default = STConfig;

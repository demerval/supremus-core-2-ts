"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const STConfig_1 = __importDefault(require("./STConfig"));
const STKey_1 = __importDefault(require("./STKey"));
class STQuery {
    constructor() {
        this._config = new STConfig_1.default();
        this._configJoin = [];
    }
    model(nomeModel) {
        this._config.model = nomeModel;
        this._config.key = STKey_1.default(0);
        return this;
    }
    join(nomeModel, on, joinFunc) {
        const stq = new STQuery();
        stq._config.model = nomeModel;
        stq._config.key = STKey_1.default(this._configJoin.length + 1);
        stq._config.joinTipo = 'inner';
        stq._config.joinOn = on;
        if (joinFunc) {
            joinFunc(stq);
        }
        this._configJoin.push(stq._config);
        return this;
    }
    joinTipo(tipo) {
        this._config.joinTipo = tipo;
        return this;
    }
    campos(campo) {
        this._config.addCampo(campo);
        return this;
    }
    criterioAnd(campo, valor, operador = '=') {
        return this.criterio(campo, valor, operador, 'and');
    }
    criterioOr(campo, valor, operador = '=') {
        return this.criterio(campo, valor, operador, 'or');
    }
    criterioGroup(GroupCriterioFunc) {
        const stq = new STQuery();
        GroupCriterioFunc(stq);
        const criterios = [];
        stq.criterios.forEach(c => {
            criterios.push(c);
        });
        this._config.addCriterio(criterios);
        return this;
    }
    criterioBetween(campo, valor, comparador = 'and') {
        this._config.addCriterio({ campo, valor, operador: 'BETWEEN', comparador });
        return this;
    }
    criterio(campo, valor, operador = '=', comparador = 'and') {
        this._config.addCriterio({ campo, valor, operador, comparador });
        return this;
    }
    ordem(campo, ordem = 'asc') {
        this._config.addOrdem({ campo, ordem });
        return this;
    }
    get criterios() {
        return this._config.criterios;
    }
    get config() {
        return this._config;
    }
    get configJoin() {
        return this._configJoin;
    }
}
exports.default = STQuery;

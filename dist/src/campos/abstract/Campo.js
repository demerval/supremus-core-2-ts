"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
class Campo {
    constructor(nome) {
        this.tipo = supremus_core_2_ts_base_1.Enums.FieldType.VARCHAR;
        this.config = {};
        this.nome = nome.toLowerCase();
    }
    configure(tipo, config) {
        this.tipo = tipo;
        if (config) {
            this.config = config;
        }
        if (this.config.obrigatorio === undefined) {
            this.config.obrigatorio = false;
        }
        if (this.config.unico === undefined) {
            this.config.unico = false;
        }
        if (this.config.tamanhoMinimo === undefined) {
            this.config.tamanhoMinimo = -1;
        }
        if (this.config.tamanhoMaximo === undefined) {
            this.config.tamanhoMaximo = 60;
        }
        if (this.config.valorPadrao === undefined) {
            this.config.valorPadrao = null;
        }
    }
    static FieldType() {
        return supremus_core_2_ts_base_1.Enums.FieldType;
    }
    getNome() {
        return this.nome;
    }
    getTipo() {
        return this.tipo;
    }
    isChavePrimaria() {
        return this.config.chavePrimaria !== undefined;
    }
    getChavePrimaria() {
        return this.config.chavePrimaria;
    }
    isChaveEstrangeira() {
        return this.config.chaveEstrangeira !== undefined;
    }
    isNaoReplicar() {
        return this.config.naoReplicar;
    }
    getChaveEstrangeira() {
        return this.config.chaveEstrangeira;
    }
    getTipoCaracter() {
        return this.config.tipoCaracter;
    }
    getDecimal() {
        return this.config.decimal;
    }
    isObrigatorio() {
        return this.config.obrigatorio;
    }
    isUnico() {
        return this.config.unico;
    }
    getValorPadrao() {
        return this.config.valorPadrao;
    }
    getTamanhoMinimo() {
        return this.config.tamanhoMinimo;
    }
    getTamanhoMaximo() {
        return this.config.tamanhoMaximo;
    }
}
exports.default = Campo;

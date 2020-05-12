"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../enums");
var Campo = /** @class */ (function () {
    function Campo(nome) {
        this.tipo = enums_1.FieldType.VARCHAR;
        this.config = {};
        this.nome = nome.toLowerCase();
    }
    Campo.prototype.configure = function (tipo, config) {
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
    };
    Campo.FieldType = function () {
        return enums_1.FieldType;
    };
    Campo.prototype.getNome = function () {
        return this.nome;
    };
    Campo.prototype.getTipo = function () {
        return this.tipo;
    };
    Campo.prototype.isChavePrimaria = function () {
        return this.config.chavePrimaria !== undefined;
    };
    Campo.prototype.getChavePrimaria = function () {
        return this.config.chavePrimaria;
    };
    Campo.prototype.isChaveEstrangeira = function () {
        return this.config.chaveEstrangeira !== undefined;
    };
    Campo.prototype.isNaoReplicar = function () {
        return this.config.naoReplicar;
    };
    Campo.prototype.getChaveEstrangeira = function () {
        return this.config.chaveEstrangeira;
    };
    Campo.prototype.getTipoCaracter = function () {
        return this.config.tipoCaracter;
    };
    Campo.prototype.getDecimal = function () {
        return this.config.decimal;
    };
    Campo.prototype.isObrigatorio = function () {
        return this.config.obrigatorio;
    };
    Campo.prototype.isUnico = function () {
        return this.config.unico;
    };
    Campo.prototype.getValorPadrao = function () {
        return this.config.valorPadrao;
    };
    Campo.prototype.getTamanhoMinimo = function () {
        return this.config.tamanhoMinimo;
    };
    Campo.prototype.getTamanhoMaximo = function () {
        return this.config.tamanhoMaximo;
    };
    return Campo;
}());
exports.default = Campo;

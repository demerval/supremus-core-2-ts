"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Campo_1 = __importDefault(require("./abstract/Campo"));
class CampoNumber extends Campo_1.default {
    constructor(nome, config) {
        super(nome);
        let tamanhoMaximo = -1;
        let tipo = Campo_1.default.FieldType().INTEGER;
        if (config) {
            if (config.decimal) {
                tipo = config.decimal > 0 ? Campo_1.default.FieldType().DECIMAL : tipo;
            }
            if (config.tipo) {
                tipo = config.tipo;
            }
            if (config.tamanhoMaximo) {
                tamanhoMaximo = config.tamanhoMaximo;
            }
            config.tamanhoMaximo = tamanhoMaximo;
        }
        else {
            config = { tipo, tamanhoMaximo };
        }
        this.configure(tipo, config);
    }
    getDados(valor, key) {
        if (valor instanceof Array) {
            return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (valor === undefined || valor === null) {
            if (this.isObrigatorio() === true) {
                if (this.getValorPadrao() !== null) {
                    return [key, this.getNome(), this.getValorPadrao(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
                }
                throw new Error(`O valor é obrigatório, campo: ${key}`);
            }
            return [key, this.getNome(), null, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (typeof valor !== 'number') {
            throw new Error(`O campo ${key} tem que ser um número.`);
        }
        if (this.getTamanhoMinimo() > -1 && valor < this.getTamanhoMinimo()) {
            throw new Error(`O campo ${key} tem que ser maior que ${this.getTamanhoMinimo()}.`);
        }
        if (this.getTamanhoMaximo() > -1 && valor > this.getTamanhoMaximo()) {
            throw new Error(`O campo ${key} tem que ser menor ou igual a ${this.getTamanhoMaximo()}.`);
        }
        return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }
    getValorSql(valor) {
        if (valor === undefined || valor === null) {
            return 'NULL';
        }
        if (typeof valor === 'string') {
            valor = valor.replace('.', '');
            if (this.getTipo() === Campo_1.default.FieldType().DECIMAL) {
                valor = valor.replace(',', '.');
                return valor;
            }
            return valor;
        }
        return valor;
    }
}
exports.default = CampoNumber;

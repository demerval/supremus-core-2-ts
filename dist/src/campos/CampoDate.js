"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Campo_1 = __importDefault(require("./abstract/Campo"));
const moment_1 = __importDefault(require("moment"));
class CampoDate extends Campo_1.default {
    constructor(nome, config) {
        super(nome);
        this.dataUpdate = false;
        if (config && config.dataUpdate) {
            this.dataUpdate = config.dataUpdate;
        }
        this.configure(this.dataUpdate === true ? Campo_1.default.FieldType().BIG_INT : Campo_1.default.FieldType().DATE, config);
    }
    isDateUpdate() {
        return this.dataUpdate;
    }
    getDados(valor, key) {
        if (valor instanceof Array) {
            return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (valor === undefined || valor === null || valor === '') {
            if (this.isObrigatorio() === true) {
                if (this.getValorPadrao() !== null) {
                    return [key, this.getNome(), this.getValorPadrao(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
                }
                throw new Error(`O valor é obrigatório, campo: ${key}`);
            }
            if (this.dataUpdate === true) {
                return [key, this.getNome(), new Date().getTime(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            }
            return [key, this.getNome(), null, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (this.dataUpdate === true) {
            if (typeof valor !== 'number') {
                throw new Error(`O campo ${key} tem que ser número.`);
            }
            return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (valor instanceof Date) {
            return [key, this.getNome(), `${moment_1.default(valor).format('YYYY-MM-DD')}`, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (moment_1.default(valor, 'DD/MM/YYYY', true).isValid() === false) {
            throw new Error(`A data do campo ${key} não é válida: ${valor}`);
        }
        return [key, this.getNome(), `${moment_1.default(valor, 'DD/MM/YYYY').format('YYYY-MM-DD')}`, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    }
    getValorSql(valor) {
        if (valor === undefined || valor === null) {
            return 'NULL';
        }
        if (this.dataUpdate === true) {
            return valor;
        }
        if (valor instanceof Date) {
            return `'${moment_1.default(valor).format('YYYY-MM-DD')}'`;
        }
        if (moment_1.default(valor, 'DD/MM/YYYY', true).isValid() === false) {
            throw new Error(`A data não é válida: ${valor}.`);
        }
        return `'${moment_1.default(valor, 'DD/MM/YYYY').format('YYYY-MM-DD')}'`;
    }
}
exports.default = CampoDate;

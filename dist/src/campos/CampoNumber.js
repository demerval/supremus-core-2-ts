"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Campo_1 = __importDefault(require("./abstract/Campo"));
var CampoNumber = /** @class */ (function (_super) {
    __extends(CampoNumber, _super);
    function CampoNumber(nome, config) {
        var _this = _super.call(this, nome) || this;
        var tamanhoMaximo = -1;
        var tipo = Campo_1.default.FieldType().INTEGER;
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
            config = { tipo: tipo, tamanhoMaximo: tamanhoMaximo };
        }
        _this.configure(tipo, config);
        return _this;
    }
    CampoNumber.prototype.getDados = function (valor, key) {
        if (valor instanceof Array) {
            return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (valor === undefined || valor === null) {
            if (this.isObrigatorio() === true) {
                if (this.getValorPadrao() !== null) {
                    return [key, this.getNome(), this.getValorPadrao(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
                }
                throw new Error("O valor \u00E9 obrigat\u00F3rio, campo: " + key);
            }
            return [key, this.getNome(), null, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (typeof valor !== 'number') {
            throw new Error("O campo " + key + " tem que ser um n\u00FAmero.");
        }
        if (this.getTamanhoMinimo() > -1 && valor < this.getTamanhoMinimo()) {
            throw new Error("O campo " + key + " tem que ser maior que " + this.getTamanhoMinimo() + ".");
        }
        if (this.getTamanhoMaximo() > -1 && valor > this.getTamanhoMaximo()) {
            throw new Error("O campo " + key + " tem que ser menor ou igual a " + this.getTamanhoMaximo() + ".");
        }
        return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    };
    CampoNumber.prototype.getValorSql = function (valor) {
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
    };
    return CampoNumber;
}(Campo_1.default));
exports.default = CampoNumber;

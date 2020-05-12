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
var CampoBoolean = /** @class */ (function (_super) {
    __extends(CampoBoolean, _super);
    function CampoBoolean(nome, config) {
        var _this = _super.call(this, nome) || this;
        _this.configure(Campo_1.default.FieldType().BOOLEAN, config);
        return _this;
    }
    CampoBoolean.prototype.getDados = function (valor, key) {
        if (valor instanceof Array) {
            return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (valor === undefined || valor === null) {
            return [key, this.getNome(), '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (typeof valor === 'boolean') {
            return [key, this.getNome(), valor === true ? '1' : '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (typeof valor === 'string') {
            if (valor === '') {
                return [key, this.getNome(), '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            }
            if (valor.toLowerCase() === 'true') {
                return [key, this.getNome(), '1', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            }
            if (valor.toLowerCase() === 'false') {
                return [key, this.getNome(), '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            }
            if (valor === '1' || valor === '0') {
                return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            }
        }
        if (typeof valor === 'number') {
            if (valor === 1) {
                return [key, this.getNome(), '1', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            }
            if (valor === 0) {
                return [key, this.getNome(), '0', this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            }
        }
        throw new Error("O campo " + key + " tem que ser booleano.");
    };
    CampoBoolean.prototype.getValorSql = function (valor) {
        if (valor === undefined || valor === null) {
            return '0';
        }
        if (typeof valor === 'boolean') {
            return valor === true ? '1' : '0';
        }
        if (typeof valor === 'string') {
            if (valor === '') {
                return '0';
            }
            if (valor.toLowerCase() === 'true') {
                return '1';
            }
            if (valor.toLowerCase() === 'false') {
                return '0';
            }
            if (valor === '1' || valor === '0') {
                return valor;
            }
        }
        if (typeof valor === 'number') {
            if (valor === 1) {
                return '1';
            }
            if (valor === 0) {
                return '0';
            }
        }
        throw new Error("Erro no valor informado o valor tem que ser booleano. Valor: " + valor);
    };
    return CampoBoolean;
}(Campo_1.default));
exports.default = CampoBoolean;

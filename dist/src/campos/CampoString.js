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
var supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
var md5 = require('js-md5');
var CampoString = /** @class */ (function (_super) {
    __extends(CampoString, _super);
    function CampoString(nome, config) {
        var _this = _super.call(this, nome) || this;
        _this.password = false;
        if (config) {
            if (config.password) {
                _this.password = config.password;
            }
        }
        _this.configure(Campo_1.default.FieldType().VARCHAR, config);
        return _this;
    }
    CampoString.prototype.getDados = function (valor, key) {
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
        if (typeof valor !== 'string') {
            throw new Error("O campo " + key + " tem que ser uma string.");
        }
        if (this.getTamanhoMinimo() > 0 && this.getTamanhoMinimo() > valor.length) {
            throw new Error("O campo " + key + " tem que ter no m\u00EDnimo " + this.getTamanhoMinimo() + " caracteres.");
        }
        if (valor.length > this.getTamanhoMaximo()) {
            throw new Error("O campo " + key + " tem que ter no m\u00E1ximo " + this.getTamanhoMaximo() + " caracteres.");
        }
        switch (this.getTipoCaracter()) {
            case supremus_core_2_ts_base_1.Enums.CaseType.NONE:
                return [key, this.getNome(), this.password === true ? md5.base64(valor) : valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            case supremus_core_2_ts_base_1.Enums.CaseType.LOWER:
                return [key, this.getNome(), this.password === true ? md5.base64(valor.toLowerCase()) : valor.toLowerCase(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            default:
                return [key, this.getNome(), this.password === true ? md5.base64(valor.toUpperCase()) : valor.toUpperCase(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
    };
    CampoString.prototype.getValorSql = function (valor) {
        if (valor === undefined || valor === null) {
            return 'NULL';
        }
        if (this.password === true) {
            return "'" + md5.base64(valor) + "'";
        }
        return "'" + valor + "'";
    };
    return CampoString;
}(Campo_1.default));
exports.default = CampoString;

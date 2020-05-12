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
var moment_1 = __importDefault(require("moment"));
var CampoDate = /** @class */ (function (_super) {
    __extends(CampoDate, _super);
    function CampoDate(nome, config) {
        var _this = _super.call(this, nome) || this;
        _this.dataUpdate = false;
        if (config && config.dataUpdate) {
            _this.dataUpdate = config.dataUpdate;
        }
        _this.configure(_this.dataUpdate === true ? Campo_1.default.FieldType().BIG_INT : Campo_1.default.FieldType().DATE, config);
        return _this;
    }
    CampoDate.prototype.isDateUpdate = function () {
        return this.dataUpdate;
    };
    CampoDate.prototype.getDados = function (valor, key) {
        if (valor instanceof Array) {
            return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (valor === undefined || valor === null || valor === '') {
            if (this.isObrigatorio() === true) {
                if (this.getValorPadrao() !== null) {
                    return [key, this.getNome(), this.getValorPadrao(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
                }
                throw new Error("O valor \u00E9 obrigat\u00F3rio, campo: " + key);
            }
            if (this.dataUpdate === true) {
                return [key, this.getNome(), new Date().getTime(), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
            }
            return [key, this.getNome(), null, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (this.dataUpdate === true) {
            if (typeof valor !== 'number') {
                throw new Error("O campo " + key + " tem que ser n\u00FAmero.");
            }
            return [key, this.getNome(), valor, this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (valor instanceof Date) {
            return [key, this.getNome(), "" + moment_1.default(valor).format('YYYY-MM-DD'), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
        }
        if (moment_1.default(valor, 'DD/MM/YYYY', true).isValid() === false) {
            throw new Error("A data do campo " + key + " n\u00E3o \u00E9 v\u00E1lida: " + valor);
        }
        return [key, this.getNome(), "" + moment_1.default(valor, 'DD/MM/YYYY').format('YYYY-MM-DD'), this.isUnico(), this.isChavePrimaria(), this.getTipo()];
    };
    CampoDate.prototype.getValorSql = function (valor) {
        if (valor === undefined || valor === null) {
            return 'NULL';
        }
        if (this.dataUpdate === true) {
            return valor;
        }
        if (valor instanceof Date) {
            return "'" + moment_1.default(valor).format('YYYY-MM-DD') + "'";
        }
        if (moment_1.default(valor, 'DD/MM/YYYY', true).isValid() === false) {
            throw new Error("A data n\u00E3o \u00E9 v\u00E1lida: " + valor + ".");
        }
        return "'" + moment_1.default(valor, 'DD/MM/YYYY').format('YYYY-MM-DD') + "'";
    };
    return CampoDate;
}(Campo_1.default));
exports.default = CampoDate;

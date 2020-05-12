"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var EstruturaUtil = /** @class */ (function () {
    function EstruturaUtil() {
    }
    EstruturaUtil.prototype.prepare = function (model) {
        var config = {
            nomeTabela: model.getNomeTabela(),
            versao: model.getVersao(),
            campos: model.getCampos(),
            configChaveEstrangeira: [],
            onEstruturaVerificada: model.onEstruturaVerificada,
        };
        this.criarSql(config);
        return config;
    };
    EstruturaUtil.prototype.criarSql = function (config) {
        var e_1, _a;
        var sql = [];
        sql.push('CREATE TABLE ');
        sql.push(config.nomeTabela);
        sql.push(' (');
        var campos = config.campos.values();
        try {
            for (var campos_1 = __values(campos), campos_1_1 = campos_1.next(); !campos_1_1.done; campos_1_1 = campos_1.next()) {
                var campo = campos_1_1.value;
                var tipo = campo.getTipo().toUpperCase();
                sql.push(campo.getNome());
                sql.push(' ');
                sql.push(tipo);
                if (tipo === 'VARCHAR') {
                    sql.push('(' + campo.getTamanhoMaximo() + ')');
                }
                if (tipo === 'NUMERIC') {
                    sql.push('(18, ' + campo.getDecimal() + ')');
                }
                if (tipo === 'BLOB') {
                    sql.push(' SUB_TYPE 1 SEGMENT SIZE 80');
                }
                if (campo.isObrigatorio() === true || campo.isChavePrimaria() === true) {
                    sql.push(' NOT NULL');
                }
                sql.push(', ');
                if (campo.isChavePrimaria() === true) {
                    var chavePrimaria = campo.getChavePrimaria();
                    var sqlCriarPrimaryKey = 'ALTER TABLE ' + config.nomeTabela + ' '
                        + 'ADD CONSTRAINT PK_' + config.nomeTabela + ' '
                        + 'PRIMARY KEY (' + campo.getNome() + ');';
                    config.configChavePrimaria = {
                        nomeTabela: config.nomeTabela,
                        sql: sqlCriarPrimaryKey,
                    };
                    if (chavePrimaria === null || chavePrimaria === void 0 ? void 0 : chavePrimaria.autoIncremento) {
                        var nomeGerador = chavePrimaria.nomeGerador ? chavePrimaria.nomeGerador : config.nomeTabela + "_GEN";
                        var sqlCriarGenerator = 'CREATE SEQUENCE ' + nomeGerador + ';';
                        config.configGerador = {
                            nomeGerador: nomeGerador,
                            sql: sqlCriarGenerator,
                        };
                    }
                }
                if (campo.isChaveEstrangeira() === true) {
                    var chaveEstrangeira = campo.getChaveEstrangeira();
                    var chave = {
                        nomeTabela: config.nomeTabela,
                        nomeTabelaFk: chaveEstrangeira.nomeTabela.toUpperCase(),
                        nomeCampoFk: campo.getNome(),
                        nomeCampoTabelaFk: chaveEstrangeira.nomeCampo.toUpperCase(),
                        onUpdate: chaveEstrangeira.onUpdate || 'NO ACTION',
                        onDelete: chaveEstrangeira.onDelete || 'NO ACTION',
                    };
                    config.configChaveEstrangeira.push(chave);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (campos_1_1 && !campos_1_1.done && (_a = campos_1.return)) _a.call(campos_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var s = sql.join('');
        config.configTabela = {
            sql: s.substring(0, s.length - 2) + ');',
        };
    };
    return EstruturaUtil;
}());
exports.default = EstruturaUtil;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabelaUtil_1 = require("./TabelaUtil");
const TabelaCriar_1 = require("./TabelaCriar");
const ChavePrimariaUtil_1 = require("./ChavePrimariaUtil");
const ChaveEstrangeiraUtil_1 = require("./ChaveEstrangeiraUtil");
exports.TabelaAjustar = {
    async verificarTabela(dao, config) {
        const nomeTabela = config.nomeTabela;
        const sql = "SELECT VERSAO FROM ESTRUTURA_VERSAO WHERE TABELA = ?";
        let rows = await dao.executarSql(sql, [nomeTabela]);
        if (rows.length === 0) {
            const existe = await TabelaUtil_1.TabelaUtil.tabelaExiste(dao, nomeTabela);
            if (existe === false) {
                return await TabelaCriar_1.TabelaCriar.criar(dao, config);
            }
            await this.ajustarTabela(dao, config);
            return await TabelaUtil_1.TabelaUtil.atualizarVersaoTabela(dao, config);
        }
        if (config.versao <= rows[0].VERSAO) {
            return true;
        }
        await this.ajustarTabela(dao, config);
        return await TabelaUtil_1.TabelaUtil.atualizarVersaoTabela(dao, config);
    },
    async ajustarTabela(dao, config) {
        const campos = config.campos.values();
        for (let campo of campos) {
            await this.verificarCampo(dao, config, campo);
        }
        return true;
    },
    async verificarCampo(dao, config, campo) {
        let sql = "SELECT RDB$RELATION_NAME, RDB$FIELD_NAME FROM RDB$RELATION_FIELDS "
            + "WHERE RDB$FIELD_NAME = '" + campo.getNome().toUpperCase() + "' AND "
            + "RDB$RELATION_NAME = '" + config.nomeTabela + "';";
        let rows = await dao.executarSql(sql);
        if (rows.length === 0) {
            return this.criarCampo(dao, config, campo);
        }
        if (campo.getTipo() === 'varchar') {
            return this.ajustarCampo(dao, config.nomeTabela, campo);
        }
        return true;
    },
    async criarCampo(dao, config, campo) {
        let tipo = campo.getTipo().toUpperCase();
        let sql = "ALTER TABLE " + config.nomeTabela + " ADD "
            + campo.getNome() + " " + tipo;
        if (tipo === "VARCHAR") {
            sql += "(" + campo.getTamanhoMaximo() + ")";
        }
        if (tipo === 'NUMERIC') {
            sql += '(18, ' + campo.getDecimal() + ')';
        }
        if (tipo === 'BLOB') {
            sql += ' SUB_TYPE 1 SEGMENT SIZE 80';
        }
        if (campo.isObrigatorio() === true || campo.isChavePrimaria() === true) {
            sql += " NOT NULL";
        }
        sql += ";";
        await dao.executarSql(sql);
        if (campo.isChavePrimaria() === true) {
            const chavePrimaria = campo.getChavePrimaria();
            const sqlCriarPrimaryKey = "ALTER TABLE " + config.nomeTabela + " "
                + "ADD CONSTRAINT PK_" + config.nomeTabela + " "
                + "PRIMARY KEY (" + campo.getNome() + ");";
            config.configChavePrimaria = {
                nomeTabela: config.nomeTabela,
                sql: sqlCriarPrimaryKey,
            };
            if (chavePrimaria === null || chavePrimaria === void 0 ? void 0 : chavePrimaria.autoIncremento) {
                const nomeGerador = chavePrimaria.nomeGerador ? chavePrimaria.nomeGerador : `${config.nomeTabela}_GEN`;
                const sqlCriarGenerator = "CREATE SEQUENCE " + nomeGerador + ";";
                config.configGerador = {
                    nomeGerador,
                    sql: sqlCriarGenerator,
                };
            }
            await ChavePrimariaUtil_1.ChavePrimariaUtil.criarChavePrimaria(dao, config.configChavePrimaria);
        }
        if (campo.isChaveEstrangeira() === true) {
            const chaveEstrangeira = campo.getChaveEstrangeira();
            const chave = {
                nomeTabela: config.nomeTabela,
                nomeTabelaFk: chaveEstrangeira.nomeTabela.toUpperCase(),
                nomeCampoFk: campo.getNome(),
                nomeCampoTabelaFk: chaveEstrangeira.nomeCampo.toUpperCase(),
                onUpdate: chaveEstrangeira.onUpdate || 'NO ACTION',
                onDelete: chaveEstrangeira.onDelete || 'NO ACTION',
            };
            config.configChaveEstrangeira.push(chave);
            await ChaveEstrangeiraUtil_1.ChaveEstrangeiraUtil.criar(dao, config.configChaveEstrangeira);
        }
        return true;
    },
    async ajustarCampo(dao, nomeTabela, campo) {
        const ajustar = await this.verificarTamanhoCampo(dao, nomeTabela, campo);
        if (ajustar === true) {
            let sql = "ALTER TABLE "
                + nomeTabela
                + " ALTER "
                + campo.getNome()
                + " TYPE VARCHAR("
                + campo.getTamanhoMaximo()
                + ");";
            await dao.executarSql(sql);
        }
        return true;
    },
    async verificarTamanhoCampo(dao, nomeTabela, campo) {
        const sql = "SELECT RDB$RELATION_FIELDS.RDB$FIELD_NAME FIELD_NAME, "
            + "RDB$FIELDS.RDB$FIELD_LENGTH FIELD_SIZE "
            + "FROM RDB$RELATION_FIELDS "
            + "JOIN RDB$FIELDS "
            + "ON RDB$FIELDS.RDB$FIELD_NAME = "
            + "RDB$RELATION_FIELDS.RDB$FIELD_SOURCE "
            + "JOIN RDB$TYPES "
            + "ON RDB$FIELDS.RDB$FIELD_TYPE = RDB$TYPES.RDB$TYPE AND "
            + "RDB$TYPES.RDB$FIELD_NAME = 'RDB$FIELD_TYPE' "
            + "WHERE RDB$RELATION_FIELDS.RDB$RELATION_NAME = '" + nomeTabela + "'"
            + "AND RDB$RELATION_FIELDS.RDB$FIELD_NAME = '" + campo.getNome() + "';";
        const rows = await dao.executarSql(sql);
        if (rows.length === 0) {
            return false;
        }
        return campo.getTamanhoMaximo() > rows[0].FIELD_SIZE;
    },
};
exports.default = exports.TabelaAjustar;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChavePrimariaUtil = {
    async criarChavePrimaria(dao, config) {
        const existe = await this.chavePrimariaExiste(dao, config.nomeTabela);
        if (existe === true) {
            return;
        }
        return await dao.executarSql(config.sql);
    },
    async chavePrimariaExiste(dao, nomeTabela) {
        let sql = "SELECT RDB$FIELD_NAME FROM RDB$RELATION_CONSTRAINTS C, RDB$INDEX_SEGMENTS S WHERE "
            + "C.RDB$CONSTRAINT_TYPE = 'PRIMARY KEY' AND S.RDB$INDEX_NAME = C.RDB$INDEX_NAME "
            + "AND RDB$RELATION_NAME = ?";
        const rows = await dao.executarSql(sql, [nomeTabela]);
        return (rows.length === 1);
    },
};

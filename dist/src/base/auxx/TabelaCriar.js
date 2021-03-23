"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabelaUtil_1 = require("./TabelaUtil");
const ChavePrimariaUtil_1 = require("./ChavePrimariaUtil");
const GeradorUtil_1 = require("./GeradorUtil");
exports.TabelaCriar = {
    async criar(dao, config) {
        await dao.executarSql(config.configTabela.sql);
        if (config.configChavePrimaria) {
            await ChavePrimariaUtil_1.ChavePrimariaUtil.criarChavePrimaria(dao, config.configChavePrimaria);
        }
        if (config.configGerador) {
            await GeradorUtil_1.GeradorUtil.criarGerador(dao, config.configGerador);
        }
        return await TabelaUtil_1.TabelaUtil.atualizarVersaoTabela(dao, config);
    }
};

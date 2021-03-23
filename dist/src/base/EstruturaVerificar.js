"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("../database/DAO"));
const ChaveEstrangeiraUtil_1 = require("./auxx/ChaveEstrangeiraUtil");
const EstruturaUtil_1 = __importDefault(require("./auxx/EstruturaUtil"));
const TabelaUtil_1 = require("./auxx/TabelaUtil");
const TabelaAjustar_1 = __importDefault(require("./auxx/TabelaAjustar"));
const TabelaCriar_1 = require("./auxx/TabelaCriar");
const ModelManager_1 = __importDefault(require("../model/ModelManager"));
class EstruturaVerificar {
    constructor() {
        this.dao = new DAO_1.default();
    }
    async verificar(verificarPadrao = true) {
        try {
            await this.dao.openConexao();
            if (verificarPadrao) {
                await this._verificarTabelasUpdate();
            }
            const models = ModelManager_1.default.getModels();
            const chavesEstrangeiras = [];
            for (let model of models) {
                if (model.isVerificar() === false) {
                    continue;
                }
                if (model.getNome() === 'updateversao') {
                    continue;
                }
                const config = new EstruturaUtil_1.default().prepare(model);
                if (config.configChaveEstrangeira.length > 0) {
                    chavesEstrangeiras.push(...config.configChaveEstrangeira);
                }
                await this._executarVerificacao(config);
            }
            if (chavesEstrangeiras.length > 0) {
                await ChaveEstrangeiraUtil_1.ChaveEstrangeiraUtil.criar(this.dao, chavesEstrangeiras);
            }
        }
        catch (error) {
            throw new Error(typeof error === 'string' ? error : error.message);
        }
        finally {
            if (this.dao.isConexaoOpen()) {
                this.dao.closeConexao();
            }
        }
    }
    async _verificarTabelasUpdate() {
        const modelEstruturaVersao = require('../base/models/EstruturaVersaoModel').default;
        const configEstruturaVersao = new EstruturaUtil_1.default().prepare(modelEstruturaVersao);
        await this._executarVerificacao(configEstruturaVersao);
        const modelUpdateVersao = require('../base/models/UpdateVersaoModel').default;
        const configUpdateVersao = new EstruturaUtil_1.default().prepare(modelUpdateVersao);
        await this._executarVerificacao(configUpdateVersao);
        ModelManager_1.default.addModel(modelUpdateVersao);
    }
    async _executarVerificacao(config) {
        const existe = await TabelaUtil_1.TabelaUtil.tabelaExiste(this.dao, config.nomeTabela);
        if (existe === true) {
            await TabelaAjustar_1.default.verificarTabela(this.dao, config);
        }
        else {
            await TabelaCriar_1.TabelaCriar.criar(this.dao, config);
        }
        return true;
    }
}
exports.default = EstruturaVerificar;

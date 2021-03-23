"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SupremusCore_1 = __importDefault(require("../SupremusCore"));
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
const ModelUpdateVersaoUtil = {
    async getModelVersao(dao, id) {
        try {
            let model = await SupremusCore_1.default.modelConsultarPorId({ key: 'uv', tabela: 'updateVersao', porId: { id } }, dao);
            if (model === undefined) {
                model = { id, versaoUpdate: 0 };
                const config = {
                    persistir: [{ id: 'updateVersao', status: supremus_core_2_ts_base_1.Enums.Status.INSERT, dados: model }],
                };
                await SupremusCore_1.default.modelPersiste(config, dao);
            }
            return model;
        }
        catch (error) {
            throw error;
        }
    },
    async atualizarVersao(dao, model) {
        try {
            const config = {
                persistir: [{ id: 'updateVersao', status: supremus_core_2_ts_base_1.Enums.Status.UPDATE, dados: model }],
            };
            await SupremusCore_1.default.modelPersiste(config, dao);
            return true;
        }
        catch (error) {
            throw error;
        }
    },
};
exports.default = ModelUpdateVersaoUtil;

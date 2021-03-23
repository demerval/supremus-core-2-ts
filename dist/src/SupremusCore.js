"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstruturaVerificar_1 = __importDefault(require("./base/EstruturaVerificar"));
const ModelManager_1 = __importDefault(require("./model/ModelManager"));
const ModelPersiste_1 = __importDefault(require("./model/ModelPersiste"));
const Consulta_1 = __importDefault(require("./sql/Consulta"));
const CarregarModelsUtil_1 = __importDefault(require("./model/auxx/CarregarModelsUtil"));
const SupremusCore = {
    async carregarModels(dirModels) {
        await new CarregarModelsUtil_1.default().verificarPastas(dirModels);
        await new EstruturaVerificar_1.default().verificar();
        return true;
    },
    addModel(model) {
        ModelManager_1.default.addModel(model);
    },
    getModel(nome) {
        return ModelManager_1.default.getModel(nome.toLowerCase());
    },
    async modelPersiste(config, dao) {
        try {
            return await new ModelPersiste_1.default().persistir(config, dao);
        }
        catch (error) {
            throw error;
        }
    },
    async modelConsultar(config, dao) {
        try {
            return await new Consulta_1.default().consultar(config, dao);
        }
        catch (error) {
            throw error;
        }
    },
    async modelConsultarArray(config, dao) {
        try {
            return await new Consulta_1.default().consultarArray(config, dao);
        }
        catch (error) {
            throw error;
        }
    },
    async modelConsultarPorId(config, dao) {
        try {
            if (config instanceof Array) {
                throw new Error('Consulta por id não pode ser um array.');
            }
            return await new Consulta_1.default().consultarPorId(config, dao);
        }
        catch (error) {
            throw error;
        }
    },
    async modelConsultarSql(config, dao) {
        try {
            return await new Consulta_1.default().consultarSql(config, dao);
        }
        catch (error) {
            throw error;
        }
    },
    async modelConsultarPaginado(config, dao) {
        try {
            if (config instanceof Array) {
                throw new Error('Consulta paginada não pode ser um array.');
            }
            return await new Consulta_1.default().consultaPaginada(config, dao);
        }
        catch (error) {
            throw error;
        }
    },
};
exports.default = SupremusCore;

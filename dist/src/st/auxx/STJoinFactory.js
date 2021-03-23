"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelManager_1 = __importDefault(require("../../model/ModelManager"));
exports.default = (model, config, keys) => {
    if (config.joinOn === null) {
        return null;
    }
    const d1 = config.joinOn[0].split('.');
    const d2 = config.joinOn[1].split('.');
    if (d1.length !== 2 || d2.length !== 2) {
        throw new Error(`Erro no join: ${config.joinOn}`);
    }
    const model1 = ModelManager_1.default.getModel(d1[0]);
    const model2 = ModelManager_1.default.getModel(d2[0]);
    const campo1 = model1.getCampo(d1[1]);
    const campo2 = model2.getCampo(d2[1]);
    if (campo1 === undefined) {
        throw new Error(`O campo ${d1[1]} não existe no model ${model1.getNome()}`);
    }
    if (campo2 === undefined) {
        throw new Error(`O campo ${d2[1]} não existe no model ${model2.getNome()}`);
    }
    let join = config.joinTipo;
    join += ` join ${model.getNomeTabela()} ${keys.get(model.getNome())}`;
    join += ` on ${keys.get(model1.getNome())}.${campo1.getNome()} = ${keys.get(model2.getNome())}.${campo2.getNome()}`;
    return join;
};

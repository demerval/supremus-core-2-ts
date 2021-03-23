"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, key, ordens) => {
    if (ordens.length === 0) {
        return null;
    }
    const ordem = [];
    ordens.forEach(o => {
        const campo = model.getCampo(o.campo);
        if (campo === undefined) {
            throw new Error(`O campo ${o.campo} não existe no model ${model.getNome()}`);
        }
        ordem.push(`${key}.${campo.getNome()} ${o.ordem}`);
    });
    return ordem.join(', ');
};

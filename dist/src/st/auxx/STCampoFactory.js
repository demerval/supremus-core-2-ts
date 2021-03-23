"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, key, campos) => {
    const c = [];
    if (campos.length === 0) {
        model.getCampos().forEach(cm => {
            c.push(`${key}.${cm.getNome()}`);
        });
        return c.join(', ');
    }
    campos.forEach(cm => {
        const campo = model.getCampo(cm);
        if (campo === undefined) {
            throw new Error(`O campo ${cm} não existe no model ${model.getNome()}`);
        }
        c.push(`${key}.${campo.getNome()}`);
    });
    return c.join(', ');
};

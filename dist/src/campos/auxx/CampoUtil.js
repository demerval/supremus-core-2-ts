"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampoUtil = {
    criarCampoMap(campos) {
        const camposMap = new Map();
        for (let campo of campos) {
            if (campo.getNome().includes('_')) {
                let sn = campo.getNome().split('_');
                for (let i = 1; i < sn.length; i++) {
                    sn[i] = sn[i][0].toUpperCase() + sn[i].slice(1);
                }
                camposMap.set(sn.join(''), campo);
            }
            else {
                camposMap.set(campo.getNome(), campo);
            }
        }
        return camposMap;
    }
};

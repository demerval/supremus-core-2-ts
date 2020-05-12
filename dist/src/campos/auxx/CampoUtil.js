"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampoUtil = {
    criarCampoMap: function (campos) {
        var e_1, _a;
        var camposMap = new Map();
        try {
            for (var campos_1 = __values(campos), campos_1_1 = campos_1.next(); !campos_1_1.done; campos_1_1 = campos_1.next()) {
                var campo = campos_1_1.value;
                if (campo.getNome().includes('_')) {
                    var sn = campo.getNome().split('_');
                    for (var i = 1; i < sn.length; i++) {
                        sn[i] = sn[i][0].toUpperCase() + sn[i].slice(1);
                    }
                    camposMap.set(sn.join(''), campo);
                }
                else {
                    camposMap.set(campo.getNome(), campo);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (campos_1_1 && !campos_1_1.done && (_a = campos_1.return)) _a.call(campos_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return camposMap;
    }
};

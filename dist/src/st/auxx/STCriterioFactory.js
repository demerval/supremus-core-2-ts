"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, key, criterios) => {
    if (criterios.length === 0) {
        return null;
    }
    const criterio = [];
    criterios.forEach(c => {
        if (c instanceof Array) {
            const cg = ['('];
            c.forEach(cgi => {
                cg.push(...getCriterio(model, key, cgi));
            });
            cg.pop();
            cg.push(')');
            criterio.push(...cg);
        }
        else {
            criterio.push(...getCriterio(model, key, c));
        }
    });
    if (criterio.length > 0) {
        if (criterio[criterio.length - 1] === 'and' || criterio[criterio.length - 1] === 'or') {
            criterio.pop();
        }
    }
    return criterio.join(' ');
};
function getCriterio(model, key, criterio) {
    const cs = [];
    const campo = model.getCampo(criterio.campo);
    if (campo === undefined) {
        throw new Error(`O campo ${criterio.campo} não existe no model ${model.getNome()}`);
    }
    cs.push(`${key}.${campo.getNome()}`);
    cs.push(criterio.operador);
    if (criterio.operador === 'BETWEEN') {
        cs.push(campo.getValorSql(criterio.valor[0]));
        cs.push('and');
        cs.push(campo.getValorSql(criterio.valor[1]));
    }
    else {
        cs.push(campo.getValorSql(criterio.valor));
    }
    cs.push(criterio.comparador);
    return cs;
}

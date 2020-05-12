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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CampoBoolean_1 = __importDefault(require("./CampoBoolean"));
describe('Testando campo booleano - getDados', function () {
    it('Verificando se o valor e booleano - Exeception', function () {
        var campo = new CampoBoolean_1.default('ativo');
        try {
            var valor = campo.getDados(2, 'ativo');
        }
        catch (error) {
            expect(error).toHaveProperty('message', 'O campo ativo tem que ser booleano.');
        }
    });
    it('Passando valor como boolean', function () {
        var campo = new CampoBoolean_1.default('ativo');
        var valorTrue = campo.getDados(true, 'c');
        expect(valorTrue).toStrictEqual(['c', 'ativo', '1', false, false, 't_yesno']);
        var valorFalse = campo.getDados(false, 'c');
        expect(valorFalse).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
    });
    it('Passando valor como string', function () {
        var e_1, _a, e_2, _b;
        var valoresVerdadeiros = ['true', '1'];
        var valoresFalsos = ['false', '0', ''];
        var campo = new CampoBoolean_1.default('ativo');
        try {
            for (var valoresVerdadeiros_1 = __values(valoresVerdadeiros), valoresVerdadeiros_1_1 = valoresVerdadeiros_1.next(); !valoresVerdadeiros_1_1.done; valoresVerdadeiros_1_1 = valoresVerdadeiros_1.next()) {
                var valor = valoresVerdadeiros_1_1.value;
                var valorTrue = campo.getDados(valor, 'c');
                expect(valorTrue).toStrictEqual(['c', 'ativo', '1', false, false, 't_yesno']);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (valoresVerdadeiros_1_1 && !valoresVerdadeiros_1_1.done && (_a = valoresVerdadeiros_1.return)) _a.call(valoresVerdadeiros_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var valoresFalsos_1 = __values(valoresFalsos), valoresFalsos_1_1 = valoresFalsos_1.next(); !valoresFalsos_1_1.done; valoresFalsos_1_1 = valoresFalsos_1.next()) {
                var valor = valoresFalsos_1_1.value;
                var valorTrue = campo.getDados(valor, 'c');
                expect(valorTrue).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (valoresFalsos_1_1 && !valoresFalsos_1_1.done && (_b = valoresFalsos_1.return)) _b.call(valoresFalsos_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
    it('Passando valor como numero', function () {
        var campo = new CampoBoolean_1.default('ativo');
        var valorTrue = campo.getDados(1, 'c');
        expect(valorTrue).toStrictEqual(['c', 'ativo', '1', false, false, 't_yesno']);
        var valorFalse = campo.getDados(0, 'c');
        expect(valorFalse).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
    });
    it('Passando array', function () {
        var campo = new CampoBoolean_1.default('ativo');
        var valorTrue = campo.getDados(['d', 'id'], 'c');
        expect(valorTrue).toStrictEqual(['c', 'ativo', ['d', 'id'], false, false, 't_yesno']);
    });
    it('Passando valor undefined ou null', function () {
        var campo = new CampoBoolean_1.default('ativo');
        var valorTrue = campo.getDados(undefined, 'c');
        expect(valorTrue).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
        var valorFalse = campo.getDados(null, 'c');
        expect(valorFalse).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
    });
});
describe('Testando campo booleano - getValorSql', function () {
    it('Verificando se o valor e booleano - Exeception', function () {
        var campo = new CampoBoolean_1.default('ativo');
        try {
            var valor = campo.getValorSql(2);
        }
        catch (error) {
            expect(error).toHaveProperty('message', 'Erro no valor informado o valor tem que ser booleano. Valor: 2');
        }
    });
    it('Passando valor como boolean', function () {
        var campo = new CampoBoolean_1.default('ativo');
        var valorTrue = campo.getValorSql(true);
        expect(valorTrue).toBe('1');
        var valorFalse = campo.getValorSql(false);
        expect(valorFalse).toBe('0');
    });
    it('Passando valor como string', function () {
        var e_3, _a, e_4, _b;
        var valoresVerdadeiros = ['true', '1'];
        var valoresFalsos = ['false', '0', ''];
        var campo = new CampoBoolean_1.default('ativo');
        try {
            for (var valoresVerdadeiros_2 = __values(valoresVerdadeiros), valoresVerdadeiros_2_1 = valoresVerdadeiros_2.next(); !valoresVerdadeiros_2_1.done; valoresVerdadeiros_2_1 = valoresVerdadeiros_2.next()) {
                var valor = valoresVerdadeiros_2_1.value;
                var valorTrue = campo.getValorSql(valor);
                expect(valorTrue).toBe('1');
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (valoresVerdadeiros_2_1 && !valoresVerdadeiros_2_1.done && (_a = valoresVerdadeiros_2.return)) _a.call(valoresVerdadeiros_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var valoresFalsos_2 = __values(valoresFalsos), valoresFalsos_2_1 = valoresFalsos_2.next(); !valoresFalsos_2_1.done; valoresFalsos_2_1 = valoresFalsos_2.next()) {
                var valor = valoresFalsos_2_1.value;
                var valorTrue = campo.getValorSql(valor);
                expect(valorTrue).toBe('0');
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (valoresFalsos_2_1 && !valoresFalsos_2_1.done && (_b = valoresFalsos_2.return)) _b.call(valoresFalsos_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
    });
    it('Passando valor como numero', function () {
        var campo = new CampoBoolean_1.default('ativo');
        var valorTrue = campo.getValorSql(1);
        expect(valorTrue).toBe('1');
        var valorFalse = campo.getValorSql(0);
        expect(valorFalse).toBe('0');
    });
    it('Passando valor undefined ou null', function () {
        var campo = new CampoBoolean_1.default('ativo');
        var valorTrue = campo.getValorSql(undefined);
        expect(valorTrue).toBe('0');
        var valorFalse = campo.getValorSql(null);
        expect(valorFalse).toBe('0');
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CampoBoolean_1 = __importDefault(require("./CampoBoolean"));
describe('Testando campo booleano - getDados', () => {
    it('Verificando se o valor e booleano - Exeception', () => {
        const campo = new CampoBoolean_1.default('ativo');
        try {
            const valor = campo.getDados(2, 'ativo');
        }
        catch (error) {
            expect(error).toHaveProperty('message', 'O campo ativo tem que ser booleano.');
        }
    });
    it('Passando valor como boolean', () => {
        const campo = new CampoBoolean_1.default('ativo');
        const valorTrue = campo.getDados(true, 'c');
        expect(valorTrue).toStrictEqual(['c', 'ativo', '1', false, false, 't_yesno']);
        const valorFalse = campo.getDados(false, 'c');
        expect(valorFalse).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
    });
    it('Passando valor como string', () => {
        const valoresVerdadeiros = ['true', '1'];
        const valoresFalsos = ['false', '0', ''];
        const campo = new CampoBoolean_1.default('ativo');
        for (let valor of valoresVerdadeiros) {
            const valorTrue = campo.getDados(valor, 'c');
            expect(valorTrue).toStrictEqual(['c', 'ativo', '1', false, false, 't_yesno']);
        }
        for (let valor of valoresFalsos) {
            const valorTrue = campo.getDados(valor, 'c');
            expect(valorTrue).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
        }
    });
    it('Passando valor como numero', () => {
        const campo = new CampoBoolean_1.default('ativo');
        const valorTrue = campo.getDados(1, 'c');
        expect(valorTrue).toStrictEqual(['c', 'ativo', '1', false, false, 't_yesno']);
        const valorFalse = campo.getDados(0, 'c');
        expect(valorFalse).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
    });
    it('Passando array', () => {
        const campo = new CampoBoolean_1.default('ativo');
        const valorTrue = campo.getDados(['d', 'id'], 'c');
        expect(valorTrue).toStrictEqual(['c', 'ativo', ['d', 'id'], false, false, 't_yesno']);
    });
    it('Passando valor undefined ou null', () => {
        const campo = new CampoBoolean_1.default('ativo');
        const valorTrue = campo.getDados(undefined, 'c');
        expect(valorTrue).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
        const valorFalse = campo.getDados(null, 'c');
        expect(valorFalse).toStrictEqual(['c', 'ativo', '0', false, false, 't_yesno']);
    });
});
describe('Testando campo booleano - getValorSql', () => {
    it('Verificando se o valor e booleano - Exeception', () => {
        const campo = new CampoBoolean_1.default('ativo');
        try {
            const valor = campo.getValorSql(2);
        }
        catch (error) {
            expect(error).toHaveProperty('message', 'Erro no valor informado o valor tem que ser booleano. Valor: 2');
        }
    });
    it('Passando valor como boolean', () => {
        const campo = new CampoBoolean_1.default('ativo');
        const valorTrue = campo.getValorSql(true);
        expect(valorTrue).toBe('1');
        const valorFalse = campo.getValorSql(false);
        expect(valorFalse).toBe('0');
    });
    it('Passando valor como string', () => {
        const valoresVerdadeiros = ['true', '1'];
        const valoresFalsos = ['false', '0', ''];
        const campo = new CampoBoolean_1.default('ativo');
        for (let valor of valoresVerdadeiros) {
            const valorTrue = campo.getValorSql(valor);
            expect(valorTrue).toBe('1');
        }
        for (let valor of valoresFalsos) {
            const valorTrue = campo.getValorSql(valor);
            expect(valorTrue).toBe('0');
        }
    });
    it('Passando valor como numero', () => {
        const campo = new CampoBoolean_1.default('ativo');
        const valorTrue = campo.getValorSql(1);
        expect(valorTrue).toBe('1');
        const valorFalse = campo.getValorSql(0);
        expect(valorFalse).toBe('0');
    });
    it('Passando valor undefined ou null', () => {
        const campo = new CampoBoolean_1.default('ativo');
        const valorTrue = campo.getValorSql(undefined);
        expect(valorTrue).toBe('0');
        const valorFalse = campo.getValorSql(null);
        expect(valorFalse).toBe('0');
    });
});

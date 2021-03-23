"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CampoDate_1 = __importDefault(require("./CampoDate"));
describe('Testando campo data - getDados', () => {
    it('Verificando se o valor e uma data - Exeception', () => {
        const campo = new CampoDate_1.default('dataCadastro');
        try {
            const valor = campo.getDados('31/02/2020', 'dataCadastro');
        }
        catch (error) {
            expect(error).toHaveProperty('message', 'A data do campo dataCadastro não é válida: 31/02/2020');
        }
    });
});

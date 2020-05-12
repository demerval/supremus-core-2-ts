import CampoDate from './CampoDate';

describe('Testando campo data - getDados', () => {

  it('Verificando se o valor e uma data - Exeception', () => {
    const campo = new CampoDate('dataCadastro');

    try {
      const valor = campo.getDados('31/02/2020', 'dataCadastro');
    } catch (error) {
      expect(error).toHaveProperty('message', 'A data do campo dataCadastro não é válida: 31/02/2020');
    }
  });

});
import Model from '../../model/Model';

export default (model: Model, key: string, campos: string[]): string => {
  const c: string[] = [];

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

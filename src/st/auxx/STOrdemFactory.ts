import Model from '../../model/Model';
import { Ordem } from './STConfig';

export default (model: Model, key: string, ordens: Ordem[]): string | null => {
  if (ordens.length === 0) {
    return null;
  }

  const ordem: string[] = [];

  ordens.forEach(o => {
    const campo = model.getCampo(o.campo);
    if (campo === undefined) {
      throw new Error(`O campo ${o.campo} não existe no model ${model.getNome()}`);
    }

    ordem.push(`${key}.${campo.getNome()} ${o.ordem}`);
  });

  return ordem.join(', ');
};

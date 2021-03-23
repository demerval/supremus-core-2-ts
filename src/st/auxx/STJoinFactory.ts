import Model from '../../model/Model';
import ModelManager from '../../model/ModelManager';
import STConfig from './STConfig';

export default (model: Model, config: STConfig, keys: Map<string, string>): string | null => {
  if (config.joinOn === null) {
    return null;
  }

  const d1 = config.joinOn[0].split('.');
  const d2 = config.joinOn[1].split('.');

  if (d1.length !== 2 || d2.length !== 2) {
    throw new Error(`Erro no join: ${config.joinOn}`);
  }

  const model1 = ModelManager.getModel(d1[0]);
  const model2 = ModelManager.getModel(d2[0]);

  const campo1 = model1.getCampo(d1[1]);
  const campo2 = model2.getCampo(d2[1]);

  if (campo1 === undefined) {
    throw new Error(`O campo ${d1[1]} não existe no model ${model1.getNome()}`);
  }
  if (campo2 === undefined) {
    throw new Error(`O campo ${d2[1]} não existe no model ${model2.getNome()}`);
  }

  let join = config.joinTipo;
  join += ` join ${model.getNomeTabela()} ${keys.get(model.getNome())}`;
  join += ` on ${keys.get(model1.getNome())}.${campo1.getNome()} = ${keys.get(model2.getNome())}.${campo2.getNome()}`;

  return join;
};

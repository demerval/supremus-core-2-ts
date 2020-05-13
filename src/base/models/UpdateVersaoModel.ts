import Model from "../../model/Model";
import CampoString from "../../campos/CampoString";
import CampoNumber from "../../campos/CampoNumber";
import Campo from "../../campos/abstract/Campo";

const campos: Map<string, Campo> = new Map();
campos.set('id', new CampoString('tabela', { obrigatorio: true, chavePrimaria: {} }));
campos.set('versaoUpdate', new CampoNumber('versao_update', { obrigatorio: true }));

export default new Model('updateVersao', 'update_versao_2', campos, 1);
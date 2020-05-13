import Model from "../../model/Model";
import CampoString from "../../campos/CampoString";
import CampoNumber from "../../campos/CampoNumber";
import Campo from "../../campos/abstract/Campo";

const campos: Map<string, Campo> = new Map();
campos.set('id', new CampoString('tabela', { obrigatorio: true, chavePrimaria: {} }));
campos.set('versao', new CampoNumber('versao', { obrigatorio: true }));

export default new Model('estruturaVersao', 'estrutura_versao', campos, 1);
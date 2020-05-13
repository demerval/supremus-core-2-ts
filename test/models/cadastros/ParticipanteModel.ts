import { Model, FieldType, CampoNumber, CampoDate, CampoString, CampoBoolean } from '../../../index';

const campos = new Map();
campos.set('id', new CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('dataCadastro', new CampoDate('dataCadastro', { obrigatorio: true }));
campos.set('razao', new CampoString('razao', { obrigatorio: true, unico: true }));
campos.set('fantasia', new CampoString('fantasia'));
campos.set('doc1', new CampoString('doc1', { tamanhoMaximo: 20 }));
campos.set('doc2', new CampoString('doc2', { tamanhoMaximo: 20 }));
campos.set('tel1', new CampoString('tel1', { tamanhoMaximo: 14 }));
campos.set('tel2', new CampoString('tel2', { tamanhoMaximo: 14 }));
campos.set('email', new CampoString('email', { tamanhoMaximo: 200 }));
campos.set('contatoNome', new CampoString('contato_nome'));
campos.set('contatoTel', new CampoString('contato_tel'));
campos.set('idLogradouro', new CampoNumber('cod_logradouro'));
campos.set('numero', new CampoString('numero', { tamanhoMaximo: 10 }));
campos.set('complemento', new CampoString('complemento'));
campos.set('obs', new CampoString('obs', { tamanhoMaximo: 200 }));
campos.set('idCondicaoPagto', new CampoNumber('cod_condicao_pagto'));
campos.set('idTipoDoc', new CampoNumber('cod_tipo_doc'));
campos.set('idVendedor', new CampoNumber('cod_vendedor'));
campos.set('idPortador', new CampoNumber('cod_portador'));
campos.set('dataFundacao', new CampoDate('data_nascimento'));
campos.set('idEmpresa', new CampoNumber('cod_empresa', { obrigatorio: true }));
campos.set('comissao', new CampoNumber('comissao', { decimal: 2 }));
campos.set('tipo', new CampoBoolean('tipo'));
campos.set('idSituacao', new CampoNumber('cod_situacao', { tipo: FieldType.SMALL_INT, obrigatorio: true }));
campos.set('tipoContribuinte', new CampoNumber('tipo_contribuinte', { tipo: FieldType.SMALL_INT }));
campos.set('cliente', new CampoBoolean('cliente'));
campos.set('consumidorFinal', new CampoBoolean('consumidor_final'));
campos.set('fornecedor', new CampoBoolean('fornecedor'));
campos.set('transportadora', new CampoBoolean('transportador'));
campos.set('terceiro', new CampoBoolean('terceiro'));
campos.set('representante', new CampoBoolean('representante'));
campos.set('dataAlteracao', new CampoDate('dt_alteracao', { dataUpdate: true }));
campos.set('alteradoPor', new CampoString('alterado_por'));


export default new Model('participante', 'clientes', campos, 1);
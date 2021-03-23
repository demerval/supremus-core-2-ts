"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
const campos = new Map();
campos.set('id', new index_1.CampoNumber('codigo', { chavePrimaria: { autoIncremento: true } }));
campos.set('nome', new index_1.CampoString('nome', { obrigatorio: true, unico: true, tamanhoMaximo: 30 }));
campos.set('senha', new index_1.CampoString('senha', { tipoCaracter: supremus_core_2_ts_base_1.Enums.CaseType.NONE, password: true }));
campos.set('ativo', new index_1.CampoBoolean('ativo'));
class UsuarioModel extends index_1.Model {
    constructor() {
        super('usuario', 'usuarios', campos, 1);
    }
    async onEstruturaVerificada(dao) {
        const model = await index_1.ModelUpdateVersao.getModelVersao(dao, 'usuario');
        model.versaoUpdate = 1;
        await index_1.ModelUpdateVersao.atualizarVersao(dao, model);
    }
}
exports.default = new UsuarioModel();

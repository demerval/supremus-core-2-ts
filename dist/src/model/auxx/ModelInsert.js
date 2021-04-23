"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelUtil_1 = require("./ModelUtil");
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
const ModelConverter_1 = require("./ModelConverter");
const replicar = process.env.REPLICAR !== undefined ? (process.env.REPLICAR === 'true' ? true : false) : false;
const codReplicar = process.env.REPLICAR_COD !== undefined ? Number(process.env.REPLICAR_COD) : '001';
exports.ModelInsert = {
    async persiste(dao, model, dados) {
        var _a;
        try {
            const nomeTabela = model.getNomeTabela();
            const campoChave = model.getChavePrimaria();
            await ModelUtil_1.ModelUtil.validarInsertUpdate(dao, nomeTabela, dados, supremus_core_2_ts_base_1.Enums.Status.INSERT, campoChave);
            await model.onAntesPersistir(dao, dados, supremus_core_2_ts_base_1.Enums.Status.INSERT);
            if ((_a = campoChave[1].getChavePrimaria()) === null || _a === void 0 ? void 0 : _a.autoIncremento) {
                const id = await gerarId(dao, nomeTabela, campoChave);
                dados.unshift(id);
            }
            const campos = [];
            const valores = [];
            const params = [];
            dados.forEach(d => {
                campos.push(d[1]);
                valores.push(d[2]);
                params.push('?');
            });
            const sql = `INSERT INTO ${nomeTabela} (${campos.join(', ')}) VALUES (${params.join(', ')});`;
            await dao.executarSql(sql, valores);
            await model.onDepoisPersistir(dao, dados, supremus_core_2_ts_base_1.Enums.Status.INSERT);
            return await ModelConverter_1.ModelConverter.criarModel(dados);
        }
        catch (error) {
            throw error;
        }
    },
};
async function gerarId(dao, nomeTabela, campoChave) {
    var _a;
    const key = campoChave[0];
    const campo = campoChave[1];
    const nomeGerador = ((_a = campo.getChavePrimaria()) === null || _a === void 0 ? void 0 : _a.nomeGerador) || `${nomeTabela}_GEN`;
    let id = await dao.gerarId(nomeGerador);
    if (replicar && campo.isNaoReplicar() === undefined) {
        id = id + codReplicar;
    }
    return campo.getDados(parseInt(id, 10), key);
}

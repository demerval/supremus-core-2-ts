import DAO from "../../database/DAO";
import Model from "../Model";
import Campo, { Dados } from "../../campos/abstract/Campo";
import { ModelUtil } from "./ModelUtil";
import { Enums } from "supremus-core-2-ts-base";
import { ModelConverter } from "./ModelConverter";

const replicar = process.env.REPLICAR !== undefined ? (process.env.REPLICAR === 'true' ? true : false) : false;
const codReplicar = process.env.REPLICAR_COD !== undefined ? Number(process.env.REPLICAR_COD) : '001';

export const ModelInsert = {

  async persiste(dao: DAO, model: Model, dados: Dados[]) {
    const nomeTabela = model.getNomeTabela();
    const campoChave = model.getChavePrimaria();

    await ModelUtil.validarInsertUpdate(dao, nomeTabela, dados, Enums.Status.INSERT, campoChave);

    if (campoChave[1].getChavePrimaria()?.autoIncremento) {
      const id = await gerarId(dao, nomeTabela, campoChave);
      dados.unshift(id);
    }

    const campos: string[] = [];
    const valores: any[] = [];
    const params: any[] = [];

    dados.forEach(d => {
      campos.push(d[1]);
      valores.push(d[2]);
      params.push('?');
    });

    await model.onAntesPersistir(dao, dados, Enums.Status.INSERT);

    const sql = `INSERT INTO ${nomeTabela} (${campos.join(', ')}) VALUES (${params.join(', ')});`;
    await dao.executarSql(sql, valores);

    await model.onDepoisPersistir(dao, dados, Enums.Status.INSERT);

    return await ModelConverter.criarModel(dados);
  },

}

async function gerarId(dao: DAO, nomeTabela: string, campoChave: [string, Campo]) {
  const key = campoChave[0];
  const campo = campoChave[1];

  const nomeGerador = campo.getChavePrimaria()?.nomeGerador || `${nomeTabela}_GEN`;
  let id = await dao.gerarId(nomeGerador);
  if (replicar && campo.isNaoReplicar() === undefined) {
    id = id + codReplicar;
  }

  return campo.getDados(parseInt(id, 10), key);
}
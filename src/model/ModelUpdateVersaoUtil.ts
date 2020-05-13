import DAO from "../database/DAO";
import SupremusCore from "../SupremusCore";
import { ConfigPersist } from "./ModelPersiste";
import { Status } from "../enums";

const ModelUpdateVersaoUtil = {

  async getModelVersao(dao: DAO, id: any) {
    let model = await SupremusCore.modelConsultar({ key: 'uv', tabela: 'updateVersao', porId: { id } }, dao);
    if (model === undefined) {
      model = { id, versaoUpdate: 0 };
      const config: ConfigPersist = {
        persistir: [{ id: 'updateVersao', status: Status.INSERT, dados: model }]
      };

      await SupremusCore.modelPersiste(config, dao);
    }

    return model;
  },

  async atualizarVersao(dao: DAO, model: any) {
    const config: ConfigPersist = {
      persistir: [{ id: 'updateVersao', status: Status.UPDATE, dados: model }]
    }

    await SupremusCore.modelPersiste(config, dao);

    return true;
  },

}

export default ModelUpdateVersaoUtil;
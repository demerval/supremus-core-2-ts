import DAO from '../database/DAO';
import SupremusCore from '../SupremusCore';
import { Enums, Persistir } from 'supremus-core-2-ts-base';

const ModelUpdateVersaoUtil = {
  async getModelVersao(dao: DAO, id: any) {
    try {
      let model = await SupremusCore.modelConsultarPorId({ key: 'uv', tabela: 'updateVersao', porId: { id } }, dao);
      if (model === undefined) {
        model = { id, versaoUpdate: 0 };
        const config: Persistir.ConfigPersist = {
          persistir: [{ id: 'updateVersao', status: Enums.Status.INSERT, dados: model }],
        };

        await SupremusCore.modelPersiste(config, dao);
      }

      return model;
    } catch (error) {
      throw error;
    }
  },

  async atualizarVersao(dao: DAO, model: any) {
    try {
      const config: Persistir.ConfigPersist = {
        persistir: [{ id: 'updateVersao', status: Enums.Status.UPDATE, dados: model }],
      };

      await SupremusCore.modelPersiste(config, dao);

      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default ModelUpdateVersaoUtil;

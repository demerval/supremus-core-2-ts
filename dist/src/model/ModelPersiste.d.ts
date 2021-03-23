import DAO from '../database/DAO';
import { Persistir } from 'supremus-core-2-ts-base';
declare class ModelPersiste {
    persistir(config: Persistir.ConfigPersist, dao?: DAO): Promise<Record<string, any>>;
}
export default ModelPersiste;

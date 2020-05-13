import { Model } from '../../index';
import DAO from '../../src/database/DAO';
declare class UsuarioModel extends Model {
    constructor();
    onEstruturaVerificada(dao: DAO): Promise<void>;
}
declare const _default: UsuarioModel;
export default _default;

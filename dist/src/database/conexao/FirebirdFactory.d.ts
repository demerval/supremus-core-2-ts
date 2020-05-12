import { Options, DatabaseCallback, Database, Transaction } from 'node-firebird';
export declare type CallbackOpenTransaction = (err: any, transaction?: Transaction) => void;
export default class {
    open(callback: DatabaseCallback, configDb?: Options): void;
    openTransaction(db: Database, callback: CallbackOpenTransaction): void;
}

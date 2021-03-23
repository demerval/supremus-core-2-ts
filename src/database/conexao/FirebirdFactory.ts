import firebird, { Options, DatabaseCallback, Database, Transaction } from 'node-firebird';

export type CallbackOpenTransaction = (err: any, transaction?: Transaction) => void;

export default class {
  open(callback: DatabaseCallback, configDb?: Options) {
    if (configDb === undefined) {
      configDb = {
        host: process.env.APP_DB_HOST,
        port: Number(process.env.APP_DB_PORT),
        database: process.env.APP_DB_DATABASE,
        user: process.env.APP_DB_USER,
        password: process.env.APP_DB_PASSWORD,
        lowercase_keys: false,
        role: process.env.APP_DB_ROLE,
        pageSize: Number(process.env.APP_DB_PAGE_SIZE),
      };
    }

    return firebird.attach(configDb, callback);
  }

  openTransaction(db: Database, callback: CallbackOpenTransaction) {
    db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction: Transaction) {
      if (err) {
        callback(true);
        return;
      }

      callback(false, transaction);
    });
  }
}

import firebird, { Options, DatabaseCallback, Database, Transaction } from 'node-firebird';

export type CallbackOpenTransaction = (err: any, transaction?: Transaction) => void;

export default class {

  open(callback: DatabaseCallback, configDb?: Options) {
    if (configDb === undefined) {
      configDb = {
        host: process.env.HOST,
        port: Number(process.env.PORT),
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        lowercase_keys: false,
        role: process.env.ROLE,
        pageSize: Number(process.env.PAGE_SIZE),
      }
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

};

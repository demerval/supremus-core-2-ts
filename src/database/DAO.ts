import { Database, Transaction, Options } from 'node-firebird';
import FirebirdFactory from './conexao/FirebirdFactory';

class DAO {
  private configDb?: Options;
  private fb: FirebirdFactory;
  private db?: Database;
  private transaction?: Transaction;

  constructor(configDb?: Options) {
    this.fb = new FirebirdFactory();
    this.configDb = configDb;
  }

  openConexao(openTransacao?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.transaction = undefined;
      this.db = undefined;

      this.fb.open((err, db) => {
        if (err) {
          return reject(err.message);
        }

        this.db = db;
        if (!openTransacao) {
          return resolve();
        }

        this.fb.openTransaction(this.db, (err, transaction) => {
          if (err) {
            return reject(err.message);
          }

          this.transaction = transaction;
          return resolve();
        });
      }, this.configDb);
    });
  }

  isConexaoOpen() {
    return this.db !== undefined;
  }

  isTransacao() {
    return this.transaction !== undefined;
  }

  executarSql(sql: string, params?: any) {
    if (this.transaction !== undefined) {
      return new Promise<any[]>((resolve, reject) => {
        this.transaction?.query(sql, params, (err, rows) => {
          if (err) {
            this.transaction?.rollback();
            this.closeConexao();
            return reject(err.message);
          }

          return resolve(rows);
        });
      });
    }

    return new Promise<any[]>((resolve, reject) => {
      this.db?.query(sql, params, (err, rows) => {
        if (err) {
          this.closeConexao();
          return reject(err.message);
        }

        return resolve(rows);
      });
    });
  }

  confirmarTransacao(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.transaction?.commit(function (err) {
        if (err) {
          return reject(err.message);
        }

        return resolve();
      });
    });
  }

  closeConexao() {
    if (this.db !== undefined) {
      this.db.detach();
    }

    this.transaction = undefined;
    this.db = undefined;
  }

  gerarId(generatorName: string) {
    return new Promise<any>((resolve, reject) => {
      var sql = `SELECT GEN_ID(${generatorName}, 1) AS GEN FROM RDB$DATABASE`;
      this.db?.query(sql, [], (err, rows) => {
        if (err) {
          return reject(err.message);
        }

        return resolve(rows[0].GEN);
      });
    });
  }
}

export default DAO;

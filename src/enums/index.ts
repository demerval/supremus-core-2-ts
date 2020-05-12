export enum FieldType {
  VARCHAR = 'varchar',
  INTEGER = 'integer',
  BIG_INT = 'bigint',
  SMALL_INT = 'smallint',
  DECIMAL = 'numeric',
  DATE = 'date',
  BOOLEAN = 't_yesno',
  BLOB = 'blob',
};

export enum CaseType {
  NONE = 'none',
  LOWER = 'lower',
  UPPER = 'upper'
};

export enum Status {
  INSERT = 'insert',
  UPDATE = 'update',
  DELETE = 'delete'
};
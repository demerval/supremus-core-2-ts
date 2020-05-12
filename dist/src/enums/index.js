"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldType;
(function (FieldType) {
    FieldType["VARCHAR"] = "varchar";
    FieldType["INTEGER"] = "integer";
    FieldType["BIG_INT"] = "bigint";
    FieldType["SMALL_INT"] = "smallint";
    FieldType["DECIMAL"] = "numeric";
    FieldType["DATE"] = "date";
    FieldType["BOOLEAN"] = "t_yesno";
    FieldType["BLOB"] = "blob";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
;
var CaseType;
(function (CaseType) {
    CaseType["NONE"] = "none";
    CaseType["LOWER"] = "lower";
    CaseType["UPPER"] = "upper";
})(CaseType = exports.CaseType || (exports.CaseType = {}));
;
var Status;
(function (Status) {
    Status["INSERT"] = "insert";
    Status["UPDATE"] = "update";
    Status["DELETE"] = "delete";
})(Status = exports.Status || (exports.Status = {}));
;

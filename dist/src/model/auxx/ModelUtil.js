"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../enums");
exports.ModelUtil = {
    validarInsertUpdate: function (dao, nomeTabela, dados, status, campoChave) {
        return __awaiter(this, void 0, void 0, function () {
            var campos, valores, chave, dados_1, dados_1_1, values, sql, rows;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        campos = [];
                        valores = [];
                        chave = null;
                        try {
                            for (dados_1 = __values(dados), dados_1_1 = dados_1.next(); !dados_1_1.done; dados_1_1 = dados_1.next()) {
                                values = dados_1_1.value;
                                if (values[4] === true) {
                                    chave = values;
                                }
                                else if (values[3] === true) {
                                    campos.push(values[1] + " = ? ");
                                    valores.push(values[2]);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (dados_1_1 && !dados_1_1.done && (_a = dados_1.return)) _a.call(dados_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (campos.length === 0) {
                            return [2 /*return*/, true];
                        }
                        if (status === enums_1.Status.INSERT) {
                            chave = [0, campoChave[1].getNome()];
                        }
                        sql = "SELECT " + chave[1] + " FROM " + nomeTabela + " WHERE (" + campos.join(' OR ') + ")";
                        if (status === enums_1.Status.UPDATE) {
                            sql += " AND " + chave[1] + " <> ?";
                            valores.push(chave[2]);
                        }
                        return [4 /*yield*/, dao.executarSql(sql, valores)];
                    case 1:
                        rows = _b.sent();
                        if (rows.length) {
                            throw Error("O registro j\u00E1 existe na base de dados!");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    },
};

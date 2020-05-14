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
Object.defineProperty(exports, "__esModule", { value: true });
var ModelUtil_1 = require("./ModelUtil");
var supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
var ModelConverter_1 = require("./ModelConverter");
var replicar = process.env.REPLICAR !== undefined ? Boolean(process.env.REPLICAR) : false;
var codReplicar = process.env.REPLICAR_COD !== undefined ? Number(process.env.REPLICAR_COD) : '001';
exports.ModelInsert = {
    persiste: function (dao, model, dados) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var nomeTabela, campoChave, id, campos, valores, params, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nomeTabela = model.getNomeTabela();
                        campoChave = model.getChavePrimaria();
                        return [4 /*yield*/, ModelUtil_1.ModelUtil.validarInsertUpdate(dao, nomeTabela, dados, supremus_core_2_ts_base_1.Enums.Status.INSERT, campoChave)];
                    case 1:
                        _b.sent();
                        if (!((_a = campoChave[1].getChavePrimaria()) === null || _a === void 0 ? void 0 : _a.autoIncremento)) return [3 /*break*/, 3];
                        return [4 /*yield*/, gerarId(dao, nomeTabela, campoChave)];
                    case 2:
                        id = _b.sent();
                        dados.unshift(id);
                        _b.label = 3;
                    case 3:
                        campos = [];
                        valores = [];
                        params = [];
                        dados.forEach(function (d) {
                            campos.push(d[1]);
                            valores.push(d[2]);
                            params.push('?');
                        });
                        return [4 /*yield*/, model.onAntesPersistir(dao, dados, supremus_core_2_ts_base_1.Enums.Status.INSERT)];
                    case 4:
                        _b.sent();
                        sql = "INSERT INTO " + nomeTabela + " (" + campos.join(', ') + ") VALUES (" + params.join(', ') + ");";
                        return [4 /*yield*/, dao.executarSql(sql, valores)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, model.onDepoisPersistir(dao, dados, supremus_core_2_ts_base_1.Enums.Status.INSERT)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, ModelConverter_1.ModelConverter.criarModel(dados)];
                    case 7: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
function gerarId(dao, nomeTabela, campoChave) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var key, campo, nomeGerador, id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    key = campoChave[0];
                    campo = campoChave[1];
                    nomeGerador = ((_a = campo.getChavePrimaria()) === null || _a === void 0 ? void 0 : _a.nomeGerador) || nomeTabela + "_GEN";
                    return [4 /*yield*/, dao.gerarId(nomeGerador)];
                case 1:
                    id = _b.sent();
                    if (replicar && campo.isNaoReplicar() === undefined) {
                        id = id + codReplicar;
                    }
                    return [2 /*return*/, campo.getDados(parseInt(id, 10), key)];
            }
        });
    });
}

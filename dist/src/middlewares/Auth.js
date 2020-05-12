"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Criptografia_1 = __importDefault(require("../base/Criptografia"));
var jwt = require('jsonwebtoken');
exports.Auth = function (req, res, next) {
    var autheader = req.headers.authorization;
    if (!autheader) {
        return res.status(401).send({ error: 'Não foi informado o token de autorização!' });
    }
    var parts = autheader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).send({ error: 'Erro no token informado!' });
    }
    var _a = __read(parts, 2), scheme = _a[0], token = _a[1];
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token formato inválido!' });
    }
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).send({ error: 'Token inválido!' });
        }
        req.user = decoded;
        req.aCtl = req.body.a;
        req.body = Criptografia_1.default.decrypt(req.body.b, req.body.a === true ? decoded.uuid : undefined);
        return next();
    });
};

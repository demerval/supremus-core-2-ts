"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Criptografia_1 = __importDefault(require("../base/Criptografia"));
const jwt = require('jsonwebtoken');
exports.Auth = (req, res, next) => {
    const autheader = req.headers.authorization;
    if (!autheader) {
        return res.status(401).send({ error: 'Não foi informado o token de autorização!' });
    }
    const parts = autheader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).send({ error: 'Erro no token informado!' });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token formato inválido!' });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token inválido!' });
        }
        req.user = decoded;
        req.aCtl = req.body.a;
        req.body = Criptografia_1.default.decrypt(req.body.b, req.body.a === true ? decoded.uuid : undefined);
        return next();
    });
};

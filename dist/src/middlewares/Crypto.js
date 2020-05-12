"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Criptografia_1 = __importDefault(require("../base/Criptografia"));
exports.Crypto = function (req, _res, next) {
    req.body = Criptografia_1.default.decrypt(req.body.b);
    return next();
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require('crypto-js');
var Criptografia = {
    encrypt: function (dados, pwd) {
        if (pwd === void 0) { pwd = 'v7J9z2oveKwr#vC9wsGhTkEd*muUYcGPZkg7IiSMb5eVdX^$i8'; }
        return CryptoJS.AES.encrypt(JSON.stringify(dados), pwd).toString();
    },
    decrypt: function (dados, pwd) {
        if (pwd === void 0) { pwd = 'v7J9z2oveKwr#vC9wsGhTkEd*muUYcGPZkg7IiSMb5eVdX^$i8'; }
        var bytes = CryptoJS.AES.decrypt(dados, pwd);
        var decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return JSON.parse(decrypt);
    },
};
exports.default = Criptografia;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const letras = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];
exports.default = (size) => {
    const div = Math.trunc(size / 26);
    const index = size - div * 26;
    if (div > 0) {
        let key = '';
        for (let i = 0; i < div; i++) {
            key += letras[i];
        }
        return key + letras[index];
    }
    return letras[index];
};

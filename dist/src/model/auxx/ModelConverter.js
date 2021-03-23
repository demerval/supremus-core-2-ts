"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
const moment_1 = __importDefault(require("moment"));
const ModelManager_1 = __importDefault(require("../ModelManager"));
exports.ModelConverter = {
    async criarModel(dados) {
        let item = {};
        for (let d of dados) {
            item[d[0]] = getValor(d[5], d[2]);
        }
        return item;
    },
    async criarModelConsulta(configs, dados, rows) {
        const key1 = configs.keys().next().value;
        const model = ModelManager_1.default.getModel(configs.get(key1).tabela);
        let itens = [];
        const map = {};
        for (let d of dados) {
            const d2 = d.alias.toUpperCase();
            if (d.funcao !== undefined) {
                map[d2] = { nome: d.alias, tipo: d.tipo, funcao: true };
            }
            if (d.keyTabela !== key1) {
                if (map[d.keyTabela]) {
                    map[d.keyTabela] = { ...map[d.keyTabela], [d2]: { nome: d.keyCampo, tipo: d.tipo, funcao: false } };
                }
                else {
                    map[d.keyTabela] = { [d2]: { nome: d.keyCampo, tipo: d.tipo, funcao: false } };
                }
            }
            else {
                map[d2] = { nome: d.keyCampo, tipo: d.tipo, funcao: false };
            }
        }
        for (let r of rows) {
            let item = {};
            Object.getOwnPropertyNames(r).forEach(name => {
                const s = name.split('_');
                const s0 = s[0].toLowerCase();
                let valor = r[name];
                if (map[name] !== undefined && map[name].funcao === true) {
                    item[map[name].nome] = getValor(map[name].tipo, valor);
                }
                else if (s0 === key1) {
                    item[map[name].nome] = getValor(map[name].tipo, valor);
                }
                else {
                    if (map[s0] === undefined) {
                        item[name] = valor;
                    }
                    else if (item[s0]) {
                        item[s0] = { ...item[s0], [map[s0][name].nome]: getValor(map[s0][name].tipo, valor) };
                    }
                    else {
                        item[s0] = { [map[s0][name].nome]: getValor(map[s0][name].tipo, valor) };
                    }
                }
            });
            await model.onDadosCarregado(item);
            itens.push(item);
        }
        return itens;
    },
    criarModelConsultaSql(rows) {
        if (rows.length === 0) {
            return [];
        }
        const itens = [];
        const map = new Map();
        for (let row of rows) {
            let item = {};
            Object.getOwnPropertyNames(row).forEach(name => {
                let n = map.get(name);
                if (n === undefined) {
                    n = nomeSaida(name);
                    map.set(name, n);
                }
                item[n] = row[name];
            });
            itens.push(item);
        }
        return itens;
    },
};
function getValor(tipo, valor) {
    if (tipo === supremus_core_2_ts_base_1.Enums.FieldType.DATE) {
        if (valor === undefined || valor === null) {
            return '';
        }
        else {
            return moment_1.default(valor, 'YYYY-MM-DD').format('DD/MM/YYYY');
        }
    }
    if (tipo === supremus_core_2_ts_base_1.Enums.FieldType.BOOLEAN) {
        if (valor === undefined || valor === null) {
            return false;
        }
        else {
            let intValue = parseInt(valor, 10);
            return (intValue === 1);
        }
    }
    return valor;
}
function nomeSaida(nome) {
    return nome
        .split('_')
        .map((word, index) => {
        if (index === 0) {
            if (word === 'CODIGO' || word === 'COD') {
                return 'id';
            }
            return word.toLowerCase();
        }
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
        .join('');
}

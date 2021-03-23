"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supremus_core_2_ts_base_1 = require("supremus-core-2-ts-base");
class Model {
    constructor(nome, nomeTabela, campos, versao = 1, verificar = true) {
        this.nome = nome.toLowerCase();
        this.nomeTabela = nomeTabela.toUpperCase();
        this.campos = campos;
        this.versao = versao;
        this.verificar = verificar;
    }
    addCampo(nome, campo) {
        this.campos.set(nome, campo);
    }
    isVerificar() {
        return this.verificar;
    }
    getNome() {
        return this.nome;
    }
    getNomeTabela() {
        return this.nomeTabela;
    }
    getCampos() {
        return this.campos;
    }
    getCampo(nome) {
        return this.campos.get(nome);
    }
    getVersao() {
        return this.versao;
    }
    getChavePrimaria() {
        for (let [key, value] of this.campos) {
            if (value.isChavePrimaria()) {
                return [key, value];
            }
        }
        throw new Error('Chave primaria não localizada.');
    }
    getDados(dados) {
        const config = [];
        Object.getOwnPropertyNames(dados).forEach(key => {
            const campo = this.campos.get(key);
            if (campo !== undefined) {
                const c = campo.getDados(dados[key], key);
                config.push(c);
            }
        });
        return config;
    }
    getCamposConsulta(key, campos) {
        const camposConsulta = [];
        let agrupar = false;
        if (campos === undefined) {
            for (const [k, c] of this.campos) {
                camposConsulta.push({
                    keyTabela: key,
                    nomeCampo: c.getNome(),
                    alias: `${key}_${c.getNome()}`,
                    keyCampo: k,
                    tipo: c.getTipo(),
                });
            }
        }
        else {
            for (const c of campos) {
                if (typeof c === 'string') {
                    const campo = this.getCampo(c);
                    if (campo === undefined) {
                        throw new Error(`O campo ${c} não foi localizado.`);
                    }
                    camposConsulta.push({
                        keyTabela: key,
                        nomeCampo: campo.getNome(),
                        alias: `${key}_${campo.getNome()}`,
                        keyCampo: c,
                        tipo: campo.getTipo(),
                    });
                }
                else {
                    agrupar = true;
                    const cFunc = c;
                    const campo = this.getCampo(cFunc.campo);
                    if (campo === undefined) {
                        throw new Error(`O campo ${cFunc.campo} não foi localizado.`);
                    }
                    camposConsulta.push({
                        keyTabela: key,
                        nomeCampo: campo.getNome(),
                        alias: cFunc.alias,
                        keyCampo: cFunc.campo,
                        tipo: campo.getTipo(),
                        funcao: cFunc.funcao === undefined ? supremus_core_2_ts_base_1.Enums.FuncoesSql.SUM : cFunc.funcao,
                    });
                }
            }
        }
        return { agrupar, campos: camposConsulta };
    }
    async onEstruturaVerificada(dao) { }
    async onDadosCarregado(item) { }
    async onAntesPersistir(dao, item, status) { }
    async onDepoisPersistir(dao, item, status) { }
}
exports.default = Model;

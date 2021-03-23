"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const STQuery_1 = __importDefault(require("./auxx/STQuery"));
const STQueryBuilder_1 = __importDefault(require("./auxx/STQueryBuilder"));
exports.default = () => {
    function select(nomeModel) {
        const query = new STQuery_1.default();
        return query.model(nomeModel);
    }
    function teste(query) {
        const config = query.config;
        const configJoin = query.configJoin;
        return new STQueryBuilder_1.default(config, configJoin).getSql();
    }
    return {
        select,
        teste,
    };
};

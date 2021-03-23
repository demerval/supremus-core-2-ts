"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ModelManager_1 = __importDefault(require("../ModelManager"));
class CarregarModelsUtil {
    async verificarPastas(dir) {
        const files = fs_1.default.readdirSync(dir);
        for (let file of files) {
            const dirFile = path_1.default.resolve(dir, file);
            if (fs_1.default.lstatSync(dirFile).isDirectory() === true) {
                await this.verificarPastas(dirFile);
            }
            else if (file.indexOf(".js") !== 0) {
                let model = require(dirFile);
                ModelManager_1.default.addModel(model.default);
            }
        }
    }
}
exports.default = CarregarModelsUtil;

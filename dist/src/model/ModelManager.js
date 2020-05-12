"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models = new Map();
var ModelManager = /** @class */ (function () {
    function ModelManager() {
    }
    ModelManager.addModel = function (model) {
        var modelExiste = models.get(model.getNome());
        if (modelExiste !== undefined) {
            throw new Error("O model " + model.getNome() + " j\u00E1 foi adicionado.");
        }
        models.set(model.getNome(), model);
    };
    ModelManager.getModel = function (nome) {
        var model = models.get(nome.toLowerCase());
        if (model !== undefined) {
            return model;
        }
        throw new Error("Model n\u00E3o localizado: " + nome);
    };
    ModelManager.getModels = function () {
        return models.values();
    };
    return ModelManager;
}());
exports.default = ModelManager;

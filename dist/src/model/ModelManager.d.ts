import Model from './Model';
declare class ModelManager {
    static addModel(model: Model): void;
    static getModel(nome: string): Model;
    static getModels(): IterableIterator<Model>;
    static clearModels(): void;
}
export default ModelManager;

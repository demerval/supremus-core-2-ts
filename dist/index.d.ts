import DAOI from './src/database/DAO';
import ConsultaI from './src/sql/Consulta';
import ModelI from './src/model/Model';
import ModelManagerI from './src/model/ModelManager';
import ModelPersisteI from './src/model/ModelPersiste';
import CampoBooleanI from './src/campos/CampoBoolean';
import CampoDateI from './src/campos/CampoDate';
import CampoNumberI from './src/campos/CampoNumber';
import CampoStringI from './src/campos/CampoString';
export declare const SupremusCore: {
    carregarModels(dirModels: string): Promise<boolean>;
    addModel(model: ModelI): void;
    getModel(nome: string): ModelI;
    modelPersiste(config: import("./src/model/ModelPersiste").ConfigPersist, dao?: DAOI | undefined): Promise<Record<string, any>>;
    modelConsultar(config: import("supremus-core-2-ts-base/dist/src/consulta").ItemConsulta | import("supremus-core-2-ts-base/dist/src/consulta").ItemConsulta[], dao?: DAOI | undefined): Promise<Record<string, any>[]>;
    modelConsultarArray(config: import("supremus-core-2-ts-base/dist/src/consulta").ItemConsulta | import("supremus-core-2-ts-base/dist/src/consulta").ItemConsulta[], dao?: DAOI | undefined): Promise<Record<string, any>>;
    modelConsultarPorId(config: import("supremus-core-2-ts-base/dist/src/consulta").ItemConsulta | import("supremus-core-2-ts-base/dist/src/consulta").ItemConsulta[], dao?: DAOI | undefined): Promise<Record<string, any> | undefined>;
    modelConsultarPaginado(config: import("supremus-core-2-ts-base/dist/src/consulta").ItemConsulta | import("supremus-core-2-ts-base/dist/src/consulta").ItemConsulta[], dao?: DAOI | undefined): Promise<{
        totalReg: number;
        data: Record<string, any>[];
        resultFuncoes: Record<string, any>[];
    }>;
};
export declare const DAO: typeof DAOI;
export declare const Consulta: typeof ConsultaI;
export declare const Criptografia: {
    encrypt(dados: any, pwd?: string): any;
    decrypt(dados: any, pwd?: string): any;
};
export declare const Model: typeof ModelI;
export declare const ModelManager: typeof ModelManagerI;
export declare const ModelPersite: typeof ModelPersisteI;
export declare const ModelUpdateVersao: {
    getModelVersao(dao: DAOI, id: any): Promise<Record<string, any>>;
    atualizarVersao(dao: DAOI, model: any): Promise<boolean>;
};
export declare const CampoBoolean: typeof CampoBooleanI;
export declare const CampoDate: typeof CampoDateI;
export declare const CampoNumber: typeof CampoNumberI;
export declare const CampoString: typeof CampoStringI;
export declare const AuthMiddleware: (req: any, res: any, next: any) => any;
export declare const CryptoMiddleware: (req: any, _res: any, next: any) => any;

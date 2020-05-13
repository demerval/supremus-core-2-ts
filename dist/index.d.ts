import DAOI from './src/database/DAO';
import ConsultaI from './src/sql/Consulta';
import ModelI from './src/model/Model';
import ModelManagerI from './src/model/ModelManager';
import ModelPersisteI from './src/model/ModelPersiste';
import CampoBooleanI from './src/campos/CampoBoolean';
import CampoDateI from './src/campos/CampoDate';
import CampoNumberI from './src/campos/CampoNumber';
import CampoStringI from './src/campos/CampoString';
import { Status as StatusI, FieldType as FieldTypeI, CaseType as CaseTypeI } from './src/enums';
export declare const SupremusCore: {
    carregarModels(dirModels: string): Promise<boolean>;
    addModel(model: ModelI): void;
    getModel(nome: string): ModelI;
    modelPersiste(config: import("./src/model/ModelPersiste").ConfigPersist, dao?: DAOI | undefined): Promise<Record<string, any>>;
    modelConsultar(config: import("./src/sql/SqlConsulta").ItemConsulta | import("./src/sql/SqlConsulta").ItemConsulta[], dao?: DAOI | undefined): Promise<Record<string, any> | Record<string, any>[] | undefined>;
    modelConsultarPorId(config: import("./src/sql/SqlConsulta").ItemConsulta | import("./src/sql/SqlConsulta").ItemConsulta[], dao?: DAOI | undefined): Promise<Record<string, any> | undefined>;
    modelConsultarPaginado(config: import("./src/sql/SqlConsulta").ItemConsulta | import("./src/sql/SqlConsulta").ItemConsulta[], dao?: DAOI | undefined): Promise<{
        totalReg: number;
        data: Record<string, any>[];
    } | undefined>;
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
export declare const Status: typeof StatusI;
export declare const FieldType: typeof FieldTypeI;
export declare const CaseType: typeof CaseTypeI;
export declare const AuthMiddleware: (req: any, res: any, next: any) => any;
export declare const CryptoMiddleware: (req: any, _res: any, next: any) => any;

import { Dados } from "../../campos/abstract/Campo";
import { Consulta as Base, Enums } from "supremus-core-2-ts-base";
export declare const ModelConverter: {
    criarModel(dados: Dados[]): Promise<Record<string, any>>;
    criarModelConsulta(configs: Map<string, Base.SqlConsultaConfig>, dados: [string, string, string, string, Enums.FieldType][], rows: any[]): Promise<Record<string, any>[]>;
};

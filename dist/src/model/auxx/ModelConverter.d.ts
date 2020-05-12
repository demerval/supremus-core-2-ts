import { Dados } from "../../campos/abstract/Campo";
import { FieldType } from "../../enums";
import { SqlConsultaConfig } from "../../sql/SqlConsulta";
export declare const ModelConverter: {
    criarModel(dados: Dados[]): Promise<Record<string, any>>;
    criarModelConsulta(configs: Map<string, SqlConsultaConfig>, dados: [string, string, string, string, FieldType][], rows: any[]): Promise<Record<string, any>[]>;
};

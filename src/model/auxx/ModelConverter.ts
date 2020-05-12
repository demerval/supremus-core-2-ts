import { Dados } from "../../campos/abstract/Campo";
import { FieldType } from "../../enums";
import moment from "moment";
import ModelManager from "../ModelManager";
import { SqlConsultaConfig } from "../../sql/SqlConsulta";

export const ModelConverter = {

  async criarModel(dados: Dados[]) {
    let item: Record<string, any> = {};

    for (let d of dados) {
      item[d[0]] = getValor(d[5], d[2]);
    }

    return item;
  },

  async criarModelConsulta(configs: Map<string, SqlConsultaConfig>, dados:  [string, string, string, string, FieldType][], rows: any[]) {
    const key1: string = configs.keys().next().value;
    const model = ModelManager.getModel(configs.get(key1)!.tabela);
    let itens = [];

    const map: Record<string, any> = {};
    for (let d of dados) {
      const d2 = d[2].toUpperCase();

      if (d[0] !== key1) {
        if (map[d[0]]) {
          map[d[0]] = { ...map[d[0]], [d2]: { nome: d[3], tipo: d[4] } };
        } else {
          map[d[0]] = { [d2]: { nome: d[3], tipo: d[4] } };
        }
      } else {
        map[d2] = { nome: d[3], tipo: d[4] };
      }
    }

    for (let r of rows) {
      let item: Record<string, any> = {};

      Object.getOwnPropertyNames(r).forEach(name => {
        const s = name.split('_');
        const s0 = s[0].toLowerCase();
        let valor = r[name];

        if (s0 === key1) {
          item[map[name].nome] = getValor(map[name].tipo, valor);
        } else {
          if (map[s0] === undefined) {
            item[name] = valor;
          } else if (item[s0]) {
            item[s0] = { ...item[s0], [map[s0][name].nome]: getValor(map[s0][name].tipo, valor) };
          } else {
            item[s0] = { [map[s0][name].nome]: getValor(map[s0][name].tipo, valor) };
          }
        }
      });

      await model.onDadosCarregado(item);

      itens.push(item);
    }

    return itens;
  }

}

function getValor(tipo: FieldType, valor: any) {
  if (tipo === FieldType.DATE) {
    if (valor === undefined || valor === null) {
      return '';
    } else {
      return moment(valor, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
  }

  if (tipo === FieldType.BOOLEAN) {
    if (valor === undefined || valor === null) {
      return false;
    } else {
      let intValue = parseInt(valor, 10);
      return (intValue === 1);
    }
  }

  return valor;
}
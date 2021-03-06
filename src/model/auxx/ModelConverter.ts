import { Dados } from "../../campos/abstract/Campo";
import { Consulta as Base, Enums } from "supremus-core-2-ts-base";
import moment from "moment";
import ModelManager from "../ModelManager";

export const ModelConverter = {

  async criarModel(dados: Dados[]) {
    let item: Record<string, any> = {};

    for (let d of dados) {
      item[d[0]] = getValor(d[5], d[2]);
    }

    return item;
  },

  async criarModelConsulta(configs: Map<string, Base.SqlConsultaConfig>, dados: Base.CampoConsulta[], rows: any[]) {
    const key1: string = configs.keys().next().value;
    const model = ModelManager.getModel(configs.get(key1)!.tabela);
    let itens = [];

    const map: Record<string, any> = {};
    for (let d of dados) {
      const d2 = d.alias.toUpperCase();

      if (d.funcao !== undefined) {
        map[d2] = { nome: d.alias, tipo: d.tipo, funcao: true };
      } if (d.keyTabela !== key1) {
        if (map[d.keyTabela]) {
          map[d.keyTabela] = { ...map[d.keyTabela], [d2]: { nome: d.keyCampo, tipo: d.tipo, funcao: false } };
        } else {
          map[d.keyTabela] = { [d2]: { nome: d.keyCampo, tipo: d.tipo, funcao: false } };
        }
      } else {
        map[d2] = { nome: d.keyCampo, tipo: d.tipo, funcao: false };
      }
    }

    for (let r of rows) {
      let item: Record<string, any> = {};

      Object.getOwnPropertyNames(r).forEach(name => {
        const s = name.split('_');
        const s0 = s[0].toLowerCase();
        let valor = r[name];

        if (map[name] !== undefined && map[name].funcao === true) {
          item[map[name].nome] = getValor(map[name].tipo, valor);
        } else if (s0 === key1) {
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
  },

  criarModelConsultaSql(rows: any[]) {
    if (rows.length === 0) {
      return [];
    }

    const itens: any[] = [];
    const map: Map<string, string> = new Map();

    for (let row of rows) {
      let item: any = {};

      Object.getOwnPropertyNames(row).forEach(name => {
        let n = map.get(name);
        if (n === undefined) {
          n = nomeSaida(name);
          map.set(name, n);
        }

        item[n] = row[name];
      });

      itens.push(item);
    }

    return itens;
  },

}

function getValor(tipo: Enums.FieldType, valor: any) {
  if (tipo === Enums.FieldType.DATE) {
    if (valor === undefined || valor === null) {
      return '';
    } else {
      return moment(valor, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
  }

  if (tipo === Enums.FieldType.BOOLEAN) {
    if (valor === undefined || valor === null) {
      return false;
    } else {
      let intValue = parseInt(valor, 10);
      return (intValue === 1);
    }
  }

  return valor;
}

function nomeSaida(nome: string): string {
  return nome
    .split('_')
    .map((word: string, index: number) => {
      if (index === 0) {
        if (word === 'CODIGO' || word === 'COD') {
          return 'id';
        }
        return word.toLowerCase();
      }
      
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}
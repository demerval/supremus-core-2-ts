import Campo from "../abstract/Campo"

export const CampoUtil = {

  criarCampoMap(campos: Campo[]): Map<string, Campo> {
    const camposMap = new Map<string, Campo>();

    for (let campo of campos) {
      if (campo.getNome().includes('_')) {
        let sn = campo.getNome().split('_');
        for (let i = 1; i < sn.length; i++) {
          sn[i] = sn[i][0].toUpperCase() + sn[i].slice(1);
        }
        camposMap.set(sn.join(''), campo);
      } else {
        camposMap.set(campo.getNome(), campo);
      }
    }

    return camposMap;
  }

}
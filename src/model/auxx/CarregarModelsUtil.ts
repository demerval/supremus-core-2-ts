import fs from 'fs';
import path from 'path';
import ModelManager from '../ModelManager';

class CarregarModelsUtil {

  async verificarPastas(dir: string) {
    const files = fs.readdirSync(dir);

    for (let file of files) {
      const dirFile = path.resolve(dir, file);

      if (fs.lstatSync(dirFile).isDirectory() === true) {
        await this.verificarPastas(dirFile);
      } else if (file.indexOf(".js") !== 0) {
        let model = require(dirFile);
        ModelManager.addModel(model);
      }
    }
  }
}

export default CarregarModelsUtil;

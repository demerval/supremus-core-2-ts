const CryptoJS = require('crypto-js');

const Criptografia = {

  encrypt(dados: any, pwd = 'v7J9z2oveKwr#vC9wsGhTkEd*muUYcGPZkg7IiSMb5eVdX^$i8') {
    return CryptoJS.AES.encrypt(JSON.stringify(dados), pwd).toString();
  },

  decrypt(dados: any, pwd = 'v7J9z2oveKwr#vC9wsGhTkEd*muUYcGPZkg7IiSMb5eVdX^$i8') {
    const bytes = CryptoJS.AES.decrypt(dados, pwd);
    const decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return JSON.parse(decrypt);
  },

}

export default Criptografia;
import Criptografia from "../base/Criptografia";

export const Crypto = (req: any, _res: any, next: any) => {
  req.body = Criptografia.decrypt(req.body.b);
  return next();
}
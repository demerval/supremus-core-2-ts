import Criptografia from "../base/Criptografia";

const jwt = require('jsonwebtoken');

export const Auth = (req: any, res: any, next: any) => {
  const autheader = req.headers.authorization;
  if (!autheader) {
    return res.status(401).send({ error: 'Não foi informado o token de autorização!' });
  }

  const parts = autheader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Erro no token informado!' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token formato inválido!' });
  }

  jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido!' });
    }

    req.user = decoded;
    req.aCtl = req.body.a;
    req.body = Criptografia.decrypt(req.body.b, req.body.a === true ? decoded.uuid : undefined);

    return next();
  });
}
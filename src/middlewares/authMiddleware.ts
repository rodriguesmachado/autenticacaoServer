import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../errors/AppError";
import authConfig from "../config/auth";

interface Decoded {
  iat: number,
  exp: number,
  sub: string
}

class AuthMiddleware {

  public async filter(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
      throw new AppError({
        mensagem: "Token não informado",
        statusCode: 401
      });
    }

    const [, token] = authHeader.split(" ");

    try{
      const decoded = verify(token, authConfig.jwt.secret);
      const { sub } = decoded as Decoded;
      request.user = {
        id: sub
      };

    }catch{
      throw new AppError({
        mensagem: "token inválido",
        statusCode: 401
      });
    }

    return next();
  }

}

export default AuthMiddleware;

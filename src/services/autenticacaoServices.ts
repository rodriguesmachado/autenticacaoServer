import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";

import Usuario from "../model/Usuario";
import SessionValidator from "../validators/sessionValidator";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";

interface Request {
  email: string;
  senha: string;
}

interface Response {
  usuario: Usuario;
  token: string
}

class AutenticacaoService {

  public async execute({ email, senha }: Request): Promise<Response> {

    const sessionValidator = new SessionValidator();

    await sessionValidator.isValid({
      email,
      senha
    });

    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository.findOne({
      where: { email }
    });

    if (!usuario) {
      throw new AppError({
        mensagem: "Email/senha inválido",
        statusCode: 400
      });
    }

    const senhaValida = await compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new AppError({
        mensagem: "Email/senha inválido",
        statusCode: 400
      });
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    delete usuario.senha;
    delete usuario.created_at;
    delete usuario.updated_at;

    return {
      usuario,
      token
    };

  }

}

export default AutenticacaoService;

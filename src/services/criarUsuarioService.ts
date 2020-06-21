import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import Usuario from "../model/Usuario";
import UsuarioValidator from "../validators/usuarioValidator";
import AppError from "../errors/AppError";


interface Request {
  nome: string;
  email: string;
  senha: string;
}

class CriarUsuarioService {

  public async execute({ nome, email, senha }: Request) {

    const usuarioValidator = new UsuarioValidator();

    await usuarioValidator.isValid({
      nome,
      email,
      senha
    });

    const usuarioRepository = getRepository(Usuario);

    const usuarioComMesmoEmail = await usuarioRepository.findOne({
      where: { email }
    });

    if (usuarioComMesmoEmail) {
      throw new AppError({
        mensagem: "Email já cadastrado",
        statusCode: 400
      });
    }

    const senhaHash = await hash(senha, 8);

    const usuario = usuarioRepository.create({
      nome,
      email,
      senha: senhaHash
    });

    await usuarioRepository.save(usuario);

    return usuario;
  }

}

export default CriarUsuarioService;

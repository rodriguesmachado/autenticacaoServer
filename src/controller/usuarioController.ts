import { Request, Response } from "express";
import { getRepository } from "typeorm";

import CriarUsuarioService from "../services/criarUsuarioService";
import Usuario from "../model/Usuario";


class UsuarioController {

  public async store(request: Request, response: Response) {

      const { nome, email, senha } = request.body;

      const criarUsuario = new CriarUsuarioService();

      const usuario = await criarUsuario.execute({
        nome,
        email,
        senha
      });

      delete usuario.senha;
      delete usuario.created_at;
      delete usuario.updated_at;

      return response.json(usuario);
  }

  public async index(request: Request, response: Response) {

    console.log(request.user);

    const usuarioRepository = getRepository(Usuario);

    const usuarios = await usuarioRepository.find({
      select: ["id", "nome", "email"]
    });

    return response.json(usuarios);
  }

}

export default UsuarioController;

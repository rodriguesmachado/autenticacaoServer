import { Request, Response } from "express";
import { getRepository } from "typeorm";

import SessionValidator from "../validators/sessionValidator";
import AutenticacaoService from "../services/autenticacaoServices";

class SessionController {

  public async store(request: Request, response: Response) {

    const { email, senha } = request.body;

    const autenticacaoService = new AutenticacaoService();

    const { usuario, token } = await autenticacaoService.execute({
      email,
      senha
    });

    return response.json({
      usuario,
      token
    });
  }

}

export default SessionController;

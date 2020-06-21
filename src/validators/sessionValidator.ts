import * as yup from "yup";

import AppError from "../errors/AppError";

interface AutenticacaoDTO {
  email: string;
  senha: string;
}

class SessionValidator {

  public async isValid({ email, senha }: AutenticacaoDTO): Promise<void> {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      senha: yup.string().required()
    });

    const autenticacao = {
      email,
      senha
    };

    const isvalid = await schema.isValid(autenticacao);

    if(!isvalid) {
      throw new AppError({
        mensagem: "Informe os campos corretamente",
        statusCode: 400
      });
    }
  }

}

export default SessionValidator;

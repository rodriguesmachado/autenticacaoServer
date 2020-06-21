import * as yup from "yup";

import AppError from "../errors/AppError";

interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
}

class UsuarioValidator {

  public async isValid({ nome, email, senha }: CriarUsuarioDTO): Promise<void> {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      email: yup.string().email().required(),
      senha: yup.string().min(8).required()
    });

    const usuario = {
      nome,
      email,
      senha
    };

    const usuarioCamposValidos = await schema.isValid(usuario);

    if(!usuarioCamposValidos) {
      throw new AppError({
        mensagem: "Informe os campos corretamente",
        statusCode: 400
      });
    }
  }

}

export default UsuarioValidator;

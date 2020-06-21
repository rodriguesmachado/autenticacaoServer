interface CamposError {
  mensagem: string;
  statusCode: number;
}

class AppError {

  public readonly mensagem: string;

  public readonly statusCode: number;

  constructor({ mensagem, statusCode = 400 }: CamposError) {
    this.mensagem = mensagem;
    this.statusCode = statusCode;
  }

}

export default AppError;

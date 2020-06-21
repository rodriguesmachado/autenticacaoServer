import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";

export default function( err: Error, request: Request, response: Response, next: NextFunction ) {

  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: "error",
      mensagem: err.mensagem
    });
  }

  return response.status(500).json({
    status: "error",
    mensagem: "Ocorreu um erro inesperado na aplicação"
  });
}

import { Router } from "express";

import UsuarioController from "../controller/usuarioController";
import AuthMiddleware from "../middlewares/authMiddleware";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();
const authMiddleware = new AuthMiddleware();

usuarioRouter.post("/", usuarioController.store);

usuarioRouter.use(authMiddleware.filter);

usuarioRouter.get("/", usuarioController.index);

export default usuarioRouter;

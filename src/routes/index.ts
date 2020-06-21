import { Router } from "express";
import sessionRoutes from "./session.routes";
import usuariosRoutes from "./usuarios.routes";

const router = Router();

router.use("/session", sessionRoutes);

router.use("/usuarios", usuariosRoutes);

export default router;

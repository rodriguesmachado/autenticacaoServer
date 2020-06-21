import { Router } from "express";

import SessionController from "../controller/sessionController";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post("/", sessionController.store);

export default sessionRouter;

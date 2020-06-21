import express from "express";
import "express-async-errors";
import routes from "./routes";
import errorMiddleware from "./middlewares/errorMiddleware";

import "reflect-metadata";
import "./database";

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

app.listen( 3333, () => { console.log("Application started on port 3333"); })

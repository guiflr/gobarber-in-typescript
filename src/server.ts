import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'
import { router } from "./routes";

import {AppError} from '../src/errors/AppError'

import "./database";

const app = express();

app.use(express.json());
app.use(router);

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if(error instanceof AppError){
    return response.status(error.status).json({ message: error.message })
  }

  return response.status(500).json({ message: 'Internal Server Error' })
})

app.listen(3020, () => {
  console.log("APP Listen On Port 3020");
});

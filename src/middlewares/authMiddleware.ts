import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "../config/auth";

import { AppError } from "../errors/AppError";

interface TokenPayload {
  sub: string;
  exp: number;
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const bearer = request.headers.authorization;

  if (!bearer) {
    throw new AppError("Token not provider", 401);
  }

  const [, token] = bearer.split(" ");

  if (token === "undefined") {
    throw new AppError("Token not provider", 401);
  }

  try {
    const dataToken = verify(token, auth.secret);

    const { sub } = dataToken as TokenPayload;

    request.user = {
      id: sub,
    };
    next();
  } catch {
    throw new AppError("Token is not valid", 401);
  }
}

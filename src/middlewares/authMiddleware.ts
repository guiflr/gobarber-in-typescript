import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "../config/auth";

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
    throw new Error("Token not provider");
  }

  const [, token] = bearer.split(" ");
  
  if (token === "undefined") {
    throw new Error("Token not provider");
  }

  try {
    const dataToken = verify(token, auth.secret);

    const { sub } = dataToken as TokenPayload;

    request.user = {
      id: sub,
    };
    next();
  } catch {
    throw new Error("Token is not valid");
  }
}

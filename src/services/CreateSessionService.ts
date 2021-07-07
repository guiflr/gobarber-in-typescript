import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import { sign, verify } from 'jsonwebtoken'

import { User } from "../models/User";

import {AppError} from '../errors/AppError'

interface Request {
  email: string;
  password: string;
}

interface UserResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<UserResponse> {
    const userRepo = getRepository(User);

    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Email/password was not found");
    }

    const passwordMath = await bcrypt.compare(password, user.password);

    if (!passwordMath) {
      throw new AppError("Email/password was not found");
    }

    const token = sign({}, 'amanhaeuvousersenior', { subject: user.id, expiresIn: '1d' })

    return { user, token };
  }
}

export { CreateSessionService };

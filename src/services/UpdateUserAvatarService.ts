import path from "path";
import fs from "fs";
import { getRepository } from "typeorm";

import uploadConfig from "../config/upload";

import { User } from "../models/User";

import { AppError } from "../errors/AppError";

interface Request {
  userId: string;
  fileName?: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, fileName }: Request): Promise<User> {
    const userRepo = getRepository(User);

    const user = await userRepo.findOne(userId);

    if (!fileName) {
      throw new AppError("Avatar not sent");
    }

    if (!user) {
      throw new AppError("Cannot find user");
    }

    if (user.avatar) {
      try {
        const filePath = path.join(uploadConfig.directory, user.avatar);
        const userFileExists = await fs.promises.stat(filePath);

        if (userFileExists) {
          await fs.promises.unlink(filePath);
        }
      } catch {}
    }

    user.avatar = fileName;

    await userRepo.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };

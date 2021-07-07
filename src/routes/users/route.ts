import { Router } from "express";
import multer from "multer";

import { CreateUserService } from "../../services/CreateUserService";
import uploadConfig from "../../config/upload";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UpdateUserAvatarService } from "../../services/UpdateUserAvatarService";

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.get("/", async (request, response) => {
  response.send();
});

userRouter.post("/", async (request, response) => {
  const { email, name, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  return response.status(201).json(user);
});

userRouter.patch(
  "/avatar/",
  authMiddleware,
  upload.single("avatar"),
  async (request, response) => {
    const userAvatarService = new UpdateUserAvatarService();

    const user = await userAvatarService.execute({
      userId: request.user.id,
      fileName: request.file?.filename,
    });

    return response.status(200).json(user);
  }
);

export { userRouter };

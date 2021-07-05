import { request, Router } from "express";
import multer from "multer";

import { CreateUserService } from "../../services/CreateUserService";
import uploadConfig from "../../config/upload";
import { authMiddleware } from "../../middlewares/authMiddleware";

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.get("/", async (request, response) => {
  response.send();
});

userRouter.post("/", async (request, response) => {
  try {
    const { email, name, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  (request, response) => {
    return response.json(request.file);
  }
);

export { userRouter };

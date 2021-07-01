import { Router } from "express";
import { CreateUserService } from "../../services/CreateUserService";

const userRouter = Router();

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

export { userRouter };

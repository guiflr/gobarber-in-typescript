import { Router } from "express";

import { CreateSessionService } from "../services/CreateSessionService";

const sessionRouter = Router();

sessionRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;
    const createUserService = new CreateSessionService();

    const { user, token } = await createUserService.execute({
      email,
      password,
    });

    const { password: _, ...userData } = user;

    return response.status(200).json({ userData, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export { sessionRouter };

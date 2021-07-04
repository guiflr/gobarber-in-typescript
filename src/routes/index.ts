import { Router } from "express";
import { appointmentsRouter } from "./appointmens/route";
import { userRouter } from "./users/route";
import { sessionRouter } from "./session.routes";

const router = Router();

router.use("/appointments", appointmentsRouter);
router.use("/users", userRouter);
router.use('/sessions', sessionRouter)

export { router };

import { Router } from "express";
import { appointmentsRouter } from "./appointmens/route";
import { userRouter } from "./users/route";

const router = Router();

router.use("/appointments", appointmentsRouter);
router.use("/users", userRouter);

export { router };

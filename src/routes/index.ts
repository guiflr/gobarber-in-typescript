import express, { Router } from "express";

import uploadConfig from "../config/upload";

import { appointmentsRouter } from "./appointmens/route";
import { userRouter } from "./users/route";
import { sessionRouter } from "./session.routes";

const router = Router();

router.use("/appointments", appointmentsRouter);
router.use("/users", userRouter);
router.use("/sessions", sessionRouter);
router.use("/files", express.static(uploadConfig.directory));

export { router };

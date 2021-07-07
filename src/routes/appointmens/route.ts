import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentRepository from "../../repositories/AppointmentRepository";
import { CreateAppointmentService } from "../../services/CreateAppointmentService";

import { authMiddleware } from "../../middlewares/authMiddleware";

const appointmentsRouter = Router();

appointmentsRouter.use(authMiddleware);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.status(200).json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export { appointmentsRouter };

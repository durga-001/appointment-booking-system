import express from "express";
import {
  doctorList,
  loginDoctor,
  changeAvailability,
  appointmentsDoctor,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);

doctorRouter.post("/change-availability", authDoctor, changeAvailability);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/accept-appointment", authDoctor, acceptAppointment);
doctorRouter.post("/reject-appointment", authDoctor, rejectAppointment);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;

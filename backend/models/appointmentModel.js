import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true }, // e.g. "5_1_2026"
  slotTime: { type: String, required: true }, // e.g. "10:00 AM"
  userData: { type: Object, required: true }, // snapshot of user at booking time
  docData: { type: Object, required: true }, // snapshot of doctor at booking time
  amount: { type: Number, required: true },
  date: { type: Number, required: true }, // booking created timestamp
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  // doctor-side workflow: every new booking starts pending until the doctor
  // accepts or rejects it
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);
export default appointmentModel;

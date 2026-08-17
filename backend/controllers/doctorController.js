import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// ---------- PUBLIC: list doctors (patients browse this), optional ?speciality= filter ----------
const doctorList = async (req, res) => {
  try {
    const { speciality } = req.query;
    const filter = speciality ? { speciality } : {};
    const doctors = await doctorModel.find(filter).select("-password -email");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- DOCTOR LOGIN ----------
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- TOGGLE AVAILABILITY ----------
const changeAvailability = async (req, res) => {
  try {
    const docData = await doctorModel.findById(req.docId);
    await doctorModel.findByIdAndUpdate(req.docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- APPOINTMENTS FOR THIS DOCTOR ----------
const appointmentsDoctor = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ docId: req.docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const ownsAppointment = async (appointmentId, docId) => {
  const appt = await appointmentModel.findById(appointmentId);
  if (!appt || appt.docId !== docId) return null;
  return appt;
};

// ---------- ACCEPT BOOKING ----------
const acceptAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appt = await ownsAppointment(appointmentId, req.docId);
    if (!appt)
      return res.json({ success: false, message: "Appointment not found" });

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      status: "accepted",
    });
    res.json({ success: true, message: "Appointment Accepted" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- REJECT BOOKING ----------
const rejectAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appt = await ownsAppointment(appointmentId, req.docId);
    if (!appt)
      return res.json({ success: false, message: "Appointment not found" });

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      status: "rejected",
      cancelled: true,
    });

    // free the slot back up
    const doctorData = await doctorModel.findById(req.docId);
    let slots_booked = doctorData.slots_booked || {};
    if (slots_booked[appt.slotDate]) {
      slots_booked[appt.slotDate] = slots_booked[appt.slotDate].filter(
        (t) => t !== appt.slotTime,
      );
    }
    await doctorModel.findByIdAndUpdate(req.docId, { slots_booked });

    res.json({ success: true, message: "Appointment Rejected" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- MARK COMPLETED ----------
const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appt = await ownsAppointment(appointmentId, req.docId);
    if (!appt)
      return res.json({ success: false, message: "Appointment not found" });

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });
    res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- DOCTOR PROFILE ----------
const doctorProfile = async (req, res) => {
  try {
    const profileData = await doctorModel
      .findById(req.docId)
      .select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available, about } = req.body;
    await doctorModel.findByIdAndUpdate(req.docId, {
      fees,
      address,
      available,
      about,
    });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  doctorList,
  loginDoctor,
  changeAvailability,
  appointmentsDoctor,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
  doctorProfile,
  updateDoctorProfile,
};

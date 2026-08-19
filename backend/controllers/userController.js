import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpayInstance from "../utils/razorpay.js";
import crypto from "crypto";

// ---------- REGISTER ----------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a strong password (min 8 chars)",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.json({
        success: false,
        message: "Account already exists, please login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign(
      { id: user._id, role: "patient" },
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

// ---------- LOGIN ----------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: "patient" },
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

// ---------- GET PROFILE ----------
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- UPDATE PROFILE ----------
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(req.userId, {
      name,
      phone,
      address: address ? JSON.parse(address) : undefined,
      dob,
      gender,
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- BOOK APPOINTMENT ----------
// This is the core "no double booking" logic: we re-check the doctor's
// slots_booked map at write time, not just trust the frontend's UI state.
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked || {};

    if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);

    const userData = await userModel.findById(req.userId).select("-password");

    const appointmentData = {
      userId: req.userId,
      docId,
      userData,
      docData: { ...docData._doc, slots_booked: undefined },
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // persist the updated slot map so the next booking attempt sees it
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- LIST MY APPOINTMENTS ----------
const listAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- CANCEL APPOINTMENT ----------
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    // ownership check - a patient can only cancel their own appointment
    if (appointmentData.userId !== req.userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // free up the slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked || {};
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (t) => t !== slotTime,
      );
    }
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- RESCHEDULE APPOINTMENT ----------
const rescheduleAppointment = async (req, res) => {
  try {
    const { appointmentId, slotDate, slotTime } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (appointmentData.userId !== req.userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
    if (appointmentData.cancelled || appointmentData.isCompleted) {
      return res.json({
        success: false,
        message: "This appointment can no longer be modified",
      });
    }

    const doctorData = await doctorModel.findById(appointmentData.docId);
    let slots_booked = doctorData.slots_booked || {};

    if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
      return res.json({
        success: false,
        message: "Selected slot not available",
      });
    }

    // free the old slot
    if (slots_booked[appointmentData.slotDate]) {
      slots_booked[appointmentData.slotDate] = slots_booked[
        appointmentData.slotDate
      ].filter((t) => t !== appointmentData.slotTime);
    }
    // reserve the new slot
    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);

    await doctorModel.findByIdAndUpdate(appointmentData.docId, {
      slots_booked,
    });
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      slotDate,
      slotTime,
    });

    res.json({ success: true, message: "Appointment Rescheduled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- CREATE RAZORPAY ORDER FOR AN APPOINTMENT ----------
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }
    if (appointmentData.userId !== req.userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    const options = {
      amount: appointmentData.amount * 100, // Razorpay expects paise, not rupees
      currency: process.env.CURRENCY || "INR",
      receipt: appointmentId,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------- VERIFY RAZORPAY PAYMENT ----------
// Never trust a "payment succeeded" flag sent from the frontend alone -
// verify the signature server-side with your key secret.
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status !== "paid") {
      return res.json({ success: false, message: "Payment not completed" });
    }

    await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
      payment: true,
    });
    res.json({ success: true, message: "Payment Successful" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  rescheduleAppointment,
  paymentRazorpay,
  verifyRazorpay,
};

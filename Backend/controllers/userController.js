import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import crypto from "crypto";

import { getCloudinary } from "../config/cloudinary.js";

import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

import Razorpay from "razorpay";

/* ============================
   REGISTER USER
============================ */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ============================
   LOGIN USER
============================ */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ============================
   GET USER PROFILE
============================ */
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");

    return res.json({
      success: true,
      message: "User profile data fetched successfully",
      userData,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ============================
   UPDATE USER PROFILE
============================ */
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (dob) updateData.dob = dob;
    if (gender) updateData.gender = gender;
    if (address) updateData.address = JSON.parse(address);

    if (Object.keys(updateData).length > 0) {
      await userModel.findByIdAndUpdate(userId, updateData);
    }

    if (imageFile) {
      const cloudinary = getCloudinary();

      if (cloudinary.__isStub) {
        return res.status(503).json({
          success: false,
          message: "Image upload service not configured",
        });
      }

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      fs.unlink(imageFile.path, (err) => {
        if (err) console.error("Failed to delete temp file:", err);
      });

      await userModel.findByIdAndUpdate(userId, {
        image: imageUpload.secure_url,
      });
    }

    return res.json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ============================
   BOOK APPOINTMENT
============================ */
const bookApointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const cleanSlotTime = String(slotTime || "").trim();

    if (!userId || !docId || !slotDate || !cleanSlotTime) {
      return res.json({ success: false, message: "Invalid slot date/time" });
    }

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = docData.slots_booked || {};

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(cleanSlotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      }
      slots_booked[slotDate].push(cleanSlotTime);
    } else {
      slots_booked[slotDate] = [cleanSlotTime];
    }

    const userData = await userModel.findById(userId).select("-password");

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime: cleanSlotTime,
      slotDate,
      date: Date.now(),
      cancelled: false,
      payment: false,
      isCompleted: false,
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: "Appointment booked successfully",
      appointmentId: newAppointment._id,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ============================
   LIST APPOINTMENTS
============================ */
const listAppointments = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointments = await appointmentModel.find({ userId });

    return res.json({
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ============================
   CANCEL APPOINTMENT (FREE SLOT)
============================ */
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // already cancelled
    if (appointmentData.cancelled) {
      return res.json({
        success: true,
        message: "Appointment already cancelled",
      });
    }

    // mark appointment cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const cleanSlotTime = String(slotTime || "").trim();

    const doctorData = await doctorModel.findById(docId);

    if (doctorData?.slots_booked?.[slotDate]) {
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[
        slotDate
      ].filter((t) => typeof t === "string" && t !== "{}" && t !== cleanSlotTime);

      // if empty, remove date key
      if (doctorData.slots_booked[slotDate].length === 0) {
        delete doctorData.slots_booked[slotDate];
      }

      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctorData.slots_booked,
      });
    }

    return res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ============================
   CREATE RAZORPAY ORDER
============================ */
const paymentRazorpay = async (req, res) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment is cancelled" });
    }

    if (appointmentData.payment) {
      return res.json({ success: false, message: "Appointment already paid" });
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: `receipt_order_${appointmentId}`,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({
      success: true,
      message: "Razorpay order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

/* ============================
   VERIFY RAZORPAY PAYMENT
============================ */
const verifyRazorpay = async (req, res) => {
  try {
    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !appointmentId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.json({
        success: false,
        message: "Missing payment verification fields",
      });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    // Mark appointment paid
    await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });

    return res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookApointment,
  listAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};

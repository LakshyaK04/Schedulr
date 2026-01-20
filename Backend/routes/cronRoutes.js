import express from "express";
import appointmentModel from "../models/appointmentModel.js";

const cronRouter = express.Router();

// Example task: auto-cancel unpaid appointments older than 30 mins
cronRouter.get("/cleanup", async (req, res) => {
  try {
    const secret = req.headers["x-cron-secret"] || req.query.secret;

    if (!secret || secret !== process.env.CRON_SECRET) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const THIRTY_MIN = 30 * 60 * 1000;
    const cutoff = Date.now() - THIRTY_MIN;

    const result = await appointmentModel.updateMany(
      {
        cancelled: false,
        payment: false,
        isCompleted: false,
        date: { $lt: cutoff },
      },
      { $set: { cancelled: true } }
    );

    return res.json({
      success: true,
      message: "Cleanup done",
      modified: result.modifiedCount,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default cronRouter;

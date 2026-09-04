const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken,appointmentController.getAppointments);
// GET ONE APPOINTMENT BY NUMBER ID 
router.get("/:id", authenticateToken,appointmentController.getAppointmentById);
router.post("/", authenticateToken, appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
// DELETE APPOINTMENT BY TITLE + DATE
router.delete("/", appointmentController.deleteAppointment);
// (Optionial)
router.delete("/:id", appointmentController.deleteAppointment)

module.exports = router;

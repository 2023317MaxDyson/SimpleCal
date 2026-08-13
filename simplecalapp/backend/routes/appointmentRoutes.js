const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/", appointmentController.getAppoinments);
// GET ONE APPOINTMENT BY NUMBER ID 
router.get("/:id", appointmentController.getAppointmentById);
router.post("/", appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
// DELETE APPOINTMENT BY TITLE + DATE
router.delete("/", appointmentController.deleteAppointment);
// (Optionial)
router.delete("/:id", appointmentController.deleteAppointment)

module.exports = router;

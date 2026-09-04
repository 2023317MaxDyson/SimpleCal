const Appointment = require("../models/Appointment.js");

// CREATE Appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      userId: req.user.userId
    });

    console.log(appointment);
    res.json(appointment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate({
      _id: req.params.id,
      userId: req.user.userId
    }, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//DELETE Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.json({
      message: "Appointment deleted successfully",
      appointment: deleted
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.userId });
    res.json(appointments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ONE APPOINTMENTS BY NUMBER
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      id: Number(req.params.id)
    });

    if (!appointment) {
      return res.status(404).json({ error: "appointment not found" });
    }

    res.json(appointment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
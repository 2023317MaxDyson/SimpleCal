const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  notes: String,
  category: String
});



module.exports = mongoose.model("Appointment", AppointmentSchema);

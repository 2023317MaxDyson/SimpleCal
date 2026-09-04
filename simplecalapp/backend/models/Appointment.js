const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  title: String,
  date: Date,
  time: String,
  notes: String,
  category: String
});



module.exports = mongoose.model("Appointment", AppointmentSchema);

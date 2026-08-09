const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  notes: String,
  category: String,
  image: String,
});



module.exports = mongoose.model("Event", EventSchema);

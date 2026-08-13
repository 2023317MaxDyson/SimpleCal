const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  notes: String,
  category: String
});


module.exports = mongoose.model("Task", TaskSchema);

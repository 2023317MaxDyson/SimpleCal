const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
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


module.exports = mongoose.model("Task", TaskSchema);

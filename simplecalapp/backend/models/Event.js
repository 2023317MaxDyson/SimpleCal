const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  date: Date,
  time: String,
  notes: String,
  category: String,
  image: String,
});



module.exports = mongoose.model("Event", EventSchema);

const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  notes: String,
  category: String,
  image: String,
});

EventSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    delete ret.__v;
  }
});

module.exports = mongoose.model("Event", EventSchema);

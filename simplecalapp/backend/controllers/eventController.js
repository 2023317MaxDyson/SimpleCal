const Event = require("../models/Event.js");

// CREATE
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//DELETE
exports.deleteEvent = async(req, res) => {
  try{
    const deleted = await Event.findByIdAndDelete(req.params.id);
    res.json(deleted);
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
}

// GET ALL
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


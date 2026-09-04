const Event = require("../models/Event.js");

// CREATE Event
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      userId: req.user.userId
    });

    console.log(event);
    res.json(event);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Event
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate({
      _id: req.params.id,
      userId: req.user.userId
    }, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//DELETE Event
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      message: "Event deleted successfully",
      event: deleted
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.userId });
    res.json(events);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ONE EVENT BY NUMBER
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      id: Number(req.params.id)
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
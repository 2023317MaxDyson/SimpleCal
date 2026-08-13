const Task = require("../models/Task.js");

// CREATE Task
exports.createEvent = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    console.log(task);
    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Task
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//DELETE Task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully",
      task: deleted
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ONE Task BY NUMBER
exports.getTaskId = async (req, res) => {
  try {
    const task = await Task.findOne({
      id: Number(req.params.id)
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
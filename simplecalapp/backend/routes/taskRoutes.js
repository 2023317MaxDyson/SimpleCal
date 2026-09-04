const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, taskController.getTasks);
// GET ONE Task BY NUMBER ID 
router.get("/:id", authenticateToken, taskController.getTaskById);
router.post("/", authenticateToken, taskController.createTask);
router.put("/:id", taskController.updateTask);
// DELETE Task BY TITLE + DATE
router.delete("/", taskController.deleteTask);
// (Optionial)
router.delete("/:id", taskController.deleteTask);

module.exports = router;

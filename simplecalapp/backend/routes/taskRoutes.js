const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, taskController.getTasks);
// GET ONE Task BY NUMBER ID 
router.get("/:id", authenticateToken, taskController.getTaskById);
router.post("/", authenticateToken, taskController.createTask);
router.put("/:id", authenticateToken, taskController.updateTask);
// DELETE Task BY TITLE + DATE
router.delete("/",  authenticateToken, taskController.deleteTask);
// (Optionial)
router.delete("/:id", authenticateToken, taskController.deleteTask);

module.exports = router;

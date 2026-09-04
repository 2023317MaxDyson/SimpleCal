const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, eventController.getEvents);
// GET ONE EVENT BY NUMBER ID 
router.get("/:id", authenticateToken, eventController.getEventById);
router.post("/", authenticateToken, eventController.createEvent);
router.put("/:id", eventController.updateEvent);
// DELETE EVENT BY TITLE + DATE
router.delete("/", eventController.deleteEvent);
// (Optionial)
router.delete("/:id", eventController.deleteEvent)

module.exports = router;


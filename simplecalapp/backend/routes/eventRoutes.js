const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, eventController.getEvents);
// GET ONE EVENT BY NUMBER ID 
router.get("/:id", authenticateToken, eventController.getEventById);
router.post("/", authenticateToken, eventController.createEvent);
router.put("/:id", authenticateToken, eventController.updateEvent);
// DELETE EVENT BY TITLE + DATE
router.delete("/",  authenticateToken, eventController.deleteEvent);
// (Optionial)
router.delete("/:id",  authenticateToken, eventController.deleteEvent)

module.exports = router;


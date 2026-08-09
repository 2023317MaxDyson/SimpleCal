const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/", eventController.getEvents);
// GET ONE EVENT BY NUMBER ID 
router.get("/:id", eventController.getEventById);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
// DELETE EVENT BY TITLE + DATE
router.delete("/", eventController.deleteEvent);
// (Optionial)
router.delete("/:id", eventController.deleteEvent)

module.exports = router;


const express = require("express");
const {
  Events,
  findEventsByUserId,
  updateEvent,
  deleteEvent,
  getAllEvents,
} = require("../controllers/event.controller");
const auth = require("../controllers/auth/auth");
const { upload } = require("../controllers/storage-event");
const router = express.Router();
router.get("/events/all", auth, getAllEvents);
router.post("/createEvent", auth, upload.array("medias", 5), Events);
router.get("/events/user", auth, findEventsByUserId);
router.put("/evenements/:id", auth, updateEvent);
router.delete("/evenements/:id", auth, deleteEvent);
module.exports = router;

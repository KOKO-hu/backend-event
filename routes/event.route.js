const express = require("express");
const {
  Events,
  findEventsByUserId,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  eventTask,
  getCityList,
  getDistrictList,
} = require("../controllers/event.controller");
const auth = require("../controllers/auth/auth");
const { upload } = require("../controllers/storage-event");
const router = express.Router();
/* task event */
router.get("/events/task", eventTask);
/*  */
router.get("/events/all", auth, getAllEvents);
router.post("/createEvent", auth, upload.array("medias", 5), Events);
router.get("/events/user", auth, findEventsByUserId);
router.get("/events/:id", auth, getEventById);
router.get("/cities",auth,getCityList)
router.get("/quartier",auth,getDistrictList)
router.put("/evenements/:id", auth, updateEvent);
router.delete("/evenements/:id", auth, deleteEvent);

module.exports = router;

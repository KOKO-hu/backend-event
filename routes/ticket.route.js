const express = require("express");

const auth = require("../controllers/auth/auth");
const {
  addTicket,
  getTicketsByUserId,
  updateTicket,
  getTicketById,
  getTicketsUpComingByUserId,
  getTicketsPastTicketByUserId,
} = require("../controllers/ticket.controller");

const router = express.Router();

router.post("/addTicket", auth, addTicket);
router.get("/ticketUser", auth, getTicketsByUserId);
router.get("/ticketByIdUpComing", auth, getTicketsUpComingByUserId);
router.get("/ticketByIdUpPast", auth, getTicketsPastTicketByUserId);
router.put("/ticket/:id", auth, updateTicket);
router.get("/tickets/:id", auth, getTicketById);

module.exports = router;

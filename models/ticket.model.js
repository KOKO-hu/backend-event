const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  id_event: { type: mongoose.Types.ObjectId, ref: "Event" },
  id_user: { type: mongoose.Types.ObjectId, ref: "User" },
  qrcode: { type: String },
  status: { type: String },
  name: { type: String },
  quantity: { type: String },
  price: { type: String },
  sale_start: { type: String },
  start_time: { type: String },
  sale_end: { type: String },
  end_time: { type: String },
  description: { type: String },
  min_qte: { type: String },
  max_qte: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;

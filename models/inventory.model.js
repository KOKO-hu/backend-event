const mongoose = require("mongoose");

const InventorySchema = mongoose.Schema({
  id_ticket: { type: mongoose.Types.ObjectId, ref: "Ticket" },
  created_at: { type: Date, default: Date.now },
});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema({
  id_user: { type: mongoose.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

const Wallet = mongoose.model("Wallet", WalletSchema);
module.exports = Wallet;
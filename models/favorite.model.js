const mongoose = require("mongoose");

const FavoriteSchema = mongoose.Schema({
  id_event: { type: mongoose.Types.ObjectId, ref: "Event" },
  id_user: { type: mongoose.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
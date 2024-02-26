const mongoose = require("mongoose");

const PointOfInterestSchema = mongoose.Schema({
  id_user: { type: mongoose.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

const PointOfInterest = mongoose.model("PointOfInterest", PointOfInterestSchema);
module.exports = PointOfInterest;
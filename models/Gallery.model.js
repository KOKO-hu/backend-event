const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema({
  id_user: { type: mongoose.Types.ObjectId, ref: "User" },
  pictures: { type:Array},
  created_at: { type: Date, default: Date.now },
});

const Gallery = mongoose.model("Gallery", GallerySchema);
module.exports = Gallery;
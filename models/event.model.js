const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  id_user: { type: mongoose.Types.ObjectId, ref: "User" },
  status: { type: String },
  title: { type: String,required: true },
  category: { type: String,required: true },
  description: { type: String ,required: true},
  favorie: { type: Boolean, default: false },
  date_debut: { type: String ,required: true},
  medias: [{ type: String }],
  date_fin: { type: String,required: true },
  created_at: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;

const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  id_user: { type: mongoose.Types.ObjectId, ref: "User" },
  status: { type: String },
  title: { type: String,required: true },
  city: { type: Object,required: true },
  country: { type: Object,required: true },
  prix_de_billet_standart: { type: String },
  prix_de_billet_vip: { type: String },
  nombre_de_billet_vip: { type: String },
  nombre_de_billet_standart: { type: String },
  status: { type: String,required: true  },
  typeEvent: { type: String,required: true  },
  description: { type: String,required: true  },
  categorie_event: { type: String,required: true },
  district: { type: Object, },
  favorie:{type: String, default: false},
  date_debut: { type: String ,required: true},
  medias: {type:Array},
  date_fin: { type: String,required: true },
  created_at: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;

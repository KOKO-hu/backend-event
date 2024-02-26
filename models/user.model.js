const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  localisation: { type: String, required: true },
  imageUrl: { type: String },
  categories: { type: Array, required: true },
  code: { type: Number },
  created_at: { type: Date, default: Date.now },
  /*   idProduct: { type: mongoose.Types.ObjectId, ref: "Product" }, */
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

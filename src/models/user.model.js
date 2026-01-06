//hello user
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  code: { type: Number, required: true },
});

const User = mongoose.model("UserFeedup", userSchema);

module.exports = User;

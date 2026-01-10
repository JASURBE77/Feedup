//hello user
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type:String},
    surname: {type:String},
    phone: {type:String, required: true , unique: true},
  code: String,
  isVerified: { type: Boolean, default: false },
})

const User = mongoose.model("UserFeedup", userSchema);

module.exports = User;

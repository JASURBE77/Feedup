const { default: mongoose, Schema } = require("mongoose");

const reviewsSchema = mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  photo: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  userId:{type:Schema.Types.ObjectId , ref:"User" , required:true}
});

const Review = mongoose.model("Review", reviewsSchema);

module.exports = Review;

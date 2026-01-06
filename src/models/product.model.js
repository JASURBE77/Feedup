const { default: mongoose, Schema } = require("mongoose");

const productShema = mongoose.Schema({
  title: { type: String, required: true },
  pictures: [{ type: String, requierd: true }],
  describe: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: { type: String, default: "not added yet" },
  price: { type: Number, required: true },
  rating: { type: Number, default: 5 },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
});

const Product = mongoose.model("Product", productShema);

module.exports = Product;
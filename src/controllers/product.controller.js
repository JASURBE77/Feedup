const Product = require("../models/product.model");
const Review = require("../models/reviews.model");

const createProduct = async (req, res) => {
  try {
    const { title, describe, price, category, pictures } = req.body;

    if (!title || !describe || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "title , describe , price , categroy - is required",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const test = async (req, res) => {
  try {
    res.json(req.files);
  } catch (err) {}
};

module.exports = {
  createProduct,
  test
};

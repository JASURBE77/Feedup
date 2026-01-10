const Product = require("../models/product.model");
const Review = require("../models/reviews.model");
const User = require("../models/user.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("reviews");
    const count = products.length;
    res.json({ success: true, products, count });
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, describe, price, category, ingredients } = req.body;

    if (!title || !describe || !price || !category || !ingredients) {
      return res.status(400).json({
        success: false,
        message:
          "title , describe , price , categroy ,ingredients - is required",
      });
    }

    const urls = req.files.map((m) => m.path);

    const numberPrice = Number(price);
    const product = new Product({
      title,
      describe,
      price: numberPrice,
      category,
      pictures: urls,
    });

    product.save();

    if (!product) {
      return res
        .status(409)
        .json({ success: false, message: "Product not created" });
    }

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {}
};

const addNewReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { text, rating, userId } = req.body;

    if (!text || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "text and rating is required!" });
    }

    const photo = req.files[0].path;

    const review = new Review({
      text,
      rating,
      photo: photo,
      productId,
      userId,
    });
    review.save();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { reviews: review._id },
      },
      { new: true }
    ).populate("reviews");

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { reviews: review._id },
      },
      {
        new: true,
      }
    );

    res.json({ success: true, user, review });
  } catch (err) {}
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category })
  
    if (!products) {
      return res.status(404).json({success:false , message:"There are no products in this category."})
    }

    res.json({success:true , products})

  } catch (err) {}
};

const test = async (req, res) => {
  try {
    res.json(req.files);
  } catch (err) {}
};

module.exports = {
  createProduct,
  test,
  getAllProducts,
  getProductById,
  addNewReview,
  getAllCategories,
  getProductByCategory
};

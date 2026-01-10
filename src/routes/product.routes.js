const express = require("express");
const {
  createProduct,
  test,
  getAllProducts,
  getProductById,
  addNewReview,
  getAllCategories,
  getProductByCategory,
} = require("../controllers/product.controller");
const { upload } = require("../config/cloudinary.config");
const routes = express.Router();

routes.post("/product/create", upload.array("pictures", 3), createProduct);
routes.get("/product/all", getAllProducts);
routes.get("/product/product/:id", getProductById);
routes.post("/product/review/:productId", upload.array("photo"), addNewReview);
routes.get("/product/categories", getAllCategories);
routes.get("/product/:category", getProductByCategory);

module.exports = routes;

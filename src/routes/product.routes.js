const express = require("express");
const { createProduct, test } = require("../controllers/product.controller");
const { upload } = require("../config/cloudinary.config");
const routes = express.Router();

routes.post("/product/create", upload.array("pictures", 3), createProduct);
routes.post("/product/test", upload.array("pictures", 5), test);

module.exports = routes;

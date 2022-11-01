const express = require("express");
const router = express.Router();
const productsService = require("../service/productsService");

router.get("/products", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let products = await productsService.getProducts();
  res.json(products);
});

router.get("/products/:product_id", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let productId = req.params.product_id;
  let products = await productsService.getProduct(productId);
  res.json(products);
});

router.get("/productsFilter/:type", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let type = req.params.type;

  let productsFilter = await productsService.getProductsFilter(type);

  res.json(productsFilter);
});

router.get("/productSize/:product_id", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let productId = req.params.product_id;
  let products = await productsService.getProductSize(productId);
  res.json(products);
});

router.get("/productStar/:product_id", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let productId = req.params.product_id;
  let productStarsData = await productsService.getProductStar(productId);
  res.json(productStarsData);
});



module.exports = router;

const express = require("express");
const router = express.Router();
const orderDetailsService = require("../service/orderDetailsService");

router.post("/orderDetails", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let product_id = req.body.product_id;
  let pedido_id = req.body.pedido_id;
  let quantity = req.body.quantity;
  let size = req.body.size;
  try {
    await orderDetailsService.postOrderDetails(
      product_id,
      pedido_id,
      quantity,
      size
    );

    res.send("orderDetails criada");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

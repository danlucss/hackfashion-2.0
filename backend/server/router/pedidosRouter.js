const express = require("express");
const router = express.Router();
const pedidosService = require("../service/pedidosService");

router.post("/pedido", async function (req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let customer_id = req.body.customer_id;
    let id_address = req.body.id_address;
    let total_price = req.body.total_price;

    let pedido_id = await pedidosService.postPedido(
      customer_id,
      id_address,
      total_price
    );
    res.json(pedido_id);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;

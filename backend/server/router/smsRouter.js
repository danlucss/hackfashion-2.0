const express = require("express");
const router = express.Router();
const smsService = require("../service/smsService");
const customersService = require("../service/customersService");

router.post("/sms", async function (req, res) {
  const pedido_id = req.body.pedido_id;
  const customer_id = req.body.customer_id;
  try {
    let name = await customersService.getName(customer_id);
    await smsService.getSmsData(name[0].name, pedido_id);
    res.send("sucess");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

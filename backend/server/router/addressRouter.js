const express = require("express");
const router = express.Router();
const addressService = require("../service/addressService");

router.get("/address/:customer_id", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let customer_id = req.params.customer_id;
  let address = await addressService.getAddressId(customer_id);

  let lastAddress = address[address.length - 1].id_address;

  res.json(lastAddress);
});

router.post("/customer", async function (req, res) {
  const cep = req.body.cep;
  const endereço = req.body.endereço;
  const numero = req.body.numero;
  const complemento = req.body.complemento;
  const referencia = req.body.referencia;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const estados = req.body.estados;

  const rows = await addressService.addressData(
    cep,
    endereço,
    numero,
    complemento,
    referencia,
    bairro,
    cidade,
    estados
  );

  res.json(rows);
});

router.post("/address", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let customer_id = req.body.customer_id;
  let address = req.body.address;
  let uf = req.body.uf;
  let city = req.body.city;
  let cep = req.body.cep;

  await addressService.postAddressTeste(customer_id, address, uf, city, cep);

  res.send("Endereço cadastrado !");
});

router.post("/addressData", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let customer_id = req.body.customer_id;

  if (customer_id === undefined || customer_id === "") {
    res.send("erro");
  } else {
    let addressData = await addressService.postAddressData(customer_id);

    let lastAddress = addressData[addressData.length - 1];

    res.json(lastAddress);
  }
});

router.put("/address", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let customer_id = req.body.customer_id;
  let address = req.body.address;
  let uf = req.body.uf;
  let city = req.body.city;
  let cep = req.body.cep;

  const updateAddress = await addressService.putAddress(
    customer_id,
    address,
    uf,
    city,
    cep
  );

  res.send(updateAddress);
});

module.exports = router;

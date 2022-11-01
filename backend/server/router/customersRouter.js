const express = require("express");
const router = express.Router();
const customersService = require("../service/customersService");
const bcrypt = require("bcrypt");

router.post("/login", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let loginEmail = await req.body.loginEmail;
  let loginPassword = await customersService.hashPassword(loginEmail); // senha hash no banco
  let customer;

  if (loginPassword.length > 0) {
    if (
      await bcrypt.compare(req.body.loginPassword, loginPassword[0].password)
    ) {
      customer = await customersService.postLogin(loginEmail);
    } else {
      customer = [
        {
          customer_id: "",
          name: "",
          phone: "",
          loged: "wrongPassword",
        },
      ];
    }

    res.json(customer);
  } else if (loginPassword.length === 0) {
    customer = [
      {
        customer_id: "",
        name: "",
        phone: "",
        loged: "notRegistered",
      },
    ];
    res.json(customer);
  }
});

router.post("/customer", async function (req, res) {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const celular = req.body.celular;

  const city = req.body.city;
  const selectedEstados = req.body.selectedEstados;
  const cep = req.body.cep;
  const endereço = req.body.endereço;
  const bairro = req.body.bairro;
  const numero = req.body.numero;
  const complemento = req.body.complemento;
  const referencia = req.body.referencia;

  if (celular === undefined) {
    const rows = await customersService.postCustomer(
      nome,
      email,
      senha,
      cep,
      endereço,
      numero,
      complemento,
      referencia,
      bairro,
      selectedEstados,
      city
    );

    res.json(rows);
  } else {
    const rows = await customersService.postCustomer(
      nome,
      email,
      senha,
      celular,
      cep,
      endereço,
      numero,
      complemento,
      referencia,
      bairro,
      selectedEstados,
      city
    );

    res.json(rows);
  }
});

router.post("/customerteste", async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let name = req.body.name;
  let email = req.body.email;
  let hashPassword = await bcrypt.hash(req.body.password, 8);
  let phone = req.body.phone;

  try {
    let customerId = await customersService.customerteste(
      name,
      email,
      hashPassword,
      phone
    );
    res.json(customerId);
  } catch (error) {
    res.send(error);
  }
});

router.put("/customer", async function (req, res) {
  const customer_id = req.body.customer_id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  const updateCustomer = await customersService.putCustomer(
    customer_id,
    name,
    email,
    password,
    phone
  );

  res.json(updateCustomer);
});

module.exports = router;

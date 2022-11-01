const customersData = require("../data/customersData");
const bcrypt = require("bcrypt");

exports.postLogin = async function (customer_email) {
  let customer = await customersData.postLogin(customer_email);

  if (customer[0] === undefined || customer[0] === null) {
    customer = [
      {
        customer_id: "",
        name: "",
        phone: "",
        loged: "notFound",
      },
    ];
  } else {
    customer = [
      {
        customer_id: customer[0].customer_id,
        name: customer[0].name,
        phone: customer[0].phone,
        loged: true,
        email: customer_email,
      },
    ];
  }

  return customer;
};

exports.postCustomer = function (
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
) {
  return customersData.postCustomer(
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
};

exports.customerteste = function (name, email, hashPassword, phone) {
  return customersData.customerteste(name, email, hashPassword, phone);
};

exports.hashPassword = function (loginEmail) {
  return customersData.hashPassword(loginEmail);
};

exports.putCustomer = async function (
  customer_id,
  name,
  email,
  password,
  phone
) {
  try {
    if (name) {
      await customersData.putCustomerName(name, customer_id);
    }
    if (email) {
      await customersData.putCustomerEmail(email, customer_id);
    }
    if (password) {
      let hashPassword = await bcrypt.hash(password, 8);
      await customersData.putCustomerPassword(hashPassword, customer_id);
    }
    if (phone) {
      await customersData.putCustomerPhone(phone, customer_id);
    }

    let customer = await customersData.putCustomer(customer_id);

    customer = [
      {
        customer_id: customer[0].customer_id,
        name: customer[0].name,
        phone: customer[0].phone,
        loged: true,
        email: customer[0].email,
      },
    ];

    return customer;
  } catch (error) {
    return error;
  }
};

exports.getName = function (customer_id) {
  return customersData.getName(customer_id);
};
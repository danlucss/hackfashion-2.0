const db = require("../infra/connection");

exports.postLogin = function (customer_email) {
  return db.query(`SELECT * FROM customer WHERE email = '${customer_email}'`);
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
  if (celular === undefined) {
    return db.query(
      `INSERT INTO usuario (name, email, password) VALUES ('${nome}', '${email}', '${senha}');
        INSERT INTO endereço (states, city, cep, address, district, number, complement, reference) 
        VALUES ('${selectedEstados}', '${city}', '${cep}', '${endereço}', '${bairro}', '${numero}', '${complemento}', '${referencia}')`
    );
  } else {
    return db.query(
      `INSERT INTO usuario (name, email, phone, password) VALUES ('${nome}', '${email}', '${celular}', '${senha}');
          INSERT INTO endereço (states, city, cep, address, district, number, complement, reference) 
          VALUES ('${selectedEstados}', '${city}', '${cep}', '${endereço}', '${bairro}', '${numero}', '${complemento}', '${referencia}')`
    );
  }
};

exports.customerteste = function (name, email, hashPassword, phone) {
  if (phone === "" || phone === undefined) {
    return db.query(`
    INSERT INTO customer (name, email, password, phone)
    VALUES ( '${name}', '${email}', '${hashPassword}', '00000000000');
    SELECT customer_id FROM customer WHERE email = '${email}'
    `);
  } else {
    return db.query(`
    INSERT INTO customer (name, email, password, phone)
    VALUES ( '${name}', '${email}', '${hashPassword}', '${phone}');
    SELECT customer_id FROM customer WHERE email = '${email}'
    `);
  }
};

exports.hashPassword = function (loginEmail) {
  return db.query(
    `
    SELECT password FROM customer WHERE email = '${loginEmail}'
    `
  );
};

exports.putCustomerName = function (name, customer_id) {
  return db.query(`
    UPDATE customer SET name = '${name}' WHERE customer_id = ${customer_id}
  `);
};

exports.putCustomerEmail = function (email, customer_id) {
  return db.query(`
    UPDATE customer SET email = '${email}' WHERE customer_id = ${customer_id}
  `);
};

exports.putCustomerPassword = function (password, customer_id) {
  return db.query(`
    UPDATE customer SET password = '${password}' WHERE customer_id = ${customer_id}
  `);
};

exports.putCustomerPhone = function (phone, customer_id) {
  return db.query(`
    UPDATE customer SET phone = '${phone}' WHERE customer_id = ${customer_id}
  `);
};

exports.putCustomer = function (customer_id) {
  return db.query(`SELECT * FROM customer WHERE customer_id = ${customer_id}`);
};

exports.getName = function (customer_id) {
  return db.query(
    `SELECT name FROM customer WHERE customer_id = ${customer_id}`
  );
};

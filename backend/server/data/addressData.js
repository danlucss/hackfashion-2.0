const db = require("../infra/connection");

exports.getAddressId = function (customer_id) {
  return db.query(
    `SELECT id_address FROM address WHERE customer_id = ${customer_id}`
  );
};

exports.postAddress = function (
  cep,
  endereço,
  numero,
  complemento,
  referencia,
  bairro,
  cidade,
  estados
) {
  return db.query(
    `INSERT INTO address_hackfashion (address, uf, city, cep) 
         VALUES ('${endereço}', '${estados}', '${cidade}', '${cep}')`
  );
};

exports.postAddressTeste = function (customer_id, address, uf, city, cep) {
  return db.none(
    `
    INSERT INTO address (customer_id, address, uf, city, cep)
    VALUES (${customer_id}, '${address}', '${uf}', '${city}', '${cep}')
    `
  );
};

exports.postAddressData = function (customer_id) {
  return db.query(
    `SELECT address, uf, city, cep FROM address WHERE customer_id = ${customer_id}`
  );
};

exports.putAddress = function (customer_id, address) {
  return db.query(`
    UPDATE address SET address = '${address}' WHERE customer_id = ${customer_id}
  `);
};

exports.putUf = function (customer_id, uf) {
  return db.query(`
  UPDATE address SET uf = '${uf}' WHERE customer_id = ${customer_id};
  `);
};
exports.putCity = function (customer_id, city) {
  return db.query(`
    UPDATE address SET city = '${city}' WHERE customer_id = ${customer_id}
  `);
};
exports.putCep = function (customer_id, cep) {
  return db.query(`
    UPDATE address SET cep = '${cep}' WHERE customer_id = ${customer_id}
  `);
};

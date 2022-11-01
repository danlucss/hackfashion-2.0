const db = require("../infra/connection");

exports.postPedido = function (customer_id, id_address, total_price) {
  return db.query(
    `INSERT INTO pedidos (customer_id, id_address, total_price, date, status)
    VALUES (${customer_id}, ${id_address}, ${total_price}, NOW(), 'AGUARDANDO PAGAMENTO');
    SELECT pedido_id FROM pedidos WHERE customer_id = ${customer_id} AND id_address = ${id_address} AND date = NOW()
    `
  );
};

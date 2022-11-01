const db = require("../infra/connection");

exports.totalQuantity = function (product_id, size) {
  return db.query(`
    SELECT ${size} FROM product_sizes WHERE product_id = ${product_id}
  `);
};

exports.postOrderDetails = function (
  product_id,
  pedido_id,
  quantity,
  size,
  totalQuantity
) {
  return db.query(`INSERT INTO order_details (product_id, pedido_id, quantity, size)
  VALUES (${product_id},${pedido_id},${quantity}, '${size}');
  UPDATE product_sizes SET ${size} = ${totalQuantity - quantity}
  WHERE product_id = ${product_id}
  `);
};

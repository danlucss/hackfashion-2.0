const pedidosData = require("../data/pedidosData");

exports.postPedido = function (customer_id, id_address, total_price) {
  return pedidosData.postPedido(customer_id, id_address, total_price);
};

const smsData = require("../data/smsData");

exports.getSmsData = function (name, pedido_id) {
  return smsData.getSmsData(name, pedido_id);
};


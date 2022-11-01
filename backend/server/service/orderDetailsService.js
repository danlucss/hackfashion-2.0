const orderDetailsData = require("../data/orderDetailsData");

exports.postOrderDetails = async function (
  product_id,
  pedido_id,
  quantity,
  size
) {
  try {
    let totalQuantityQuery = await orderDetailsData.totalQuantity(
      product_id,
      size
    );

    let totalQuantity;

    if (size === "p") {
      totalQuantity = totalQuantityQuery[0].p;
    } else if (size === "m") {
      totalQuantity = totalQuantityQuery[0].m;
    } else if (size === "g") {
      totalQuantity = totalQuantityQuery[0].g;
    } else if (size === "gg") {
      totalQuantity = totalQuantityQuery[0].gg;
    }

    return orderDetailsData.postOrderDetails(
      product_id,
      pedido_id,
      quantity,
      size,
      totalQuantity
    );
  } catch (error) {
    return error;
  }
};

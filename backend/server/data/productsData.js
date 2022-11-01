const db = require("../infra/connection");

exports.getProducts = function () {
  return db.query(
    `SELECT DISTINCT products.product_id, 
  products.name, 
  products.img_link, 
  products.price, 
  products.trademark, 
  products.offer_percent, 
  products.in_stock,
  types.type
  FROM product_types 
  INNER JOIN products 
  ON product_types.product_id = products.product_id 
  INNER JOIN types 
  ON product_types.type_id = types.type_id 
  INNER JOIN product_colors
  ON product_colors.product_id = products.product_id
  INNER JOIN colors
  ON colors.color_id = product_colors.color_id
  `
  );
};

exports.getProduct = function (productId) {
  return db.query(`SELECT * FROM products WHERE product_id = ${productId}`);
};

exports.getProductSize = function (productId) {
  return db.query(
    `SELECT p, m, g, gg FROM product_sizes WHERE product_id = ${productId}`
  );
};

exports.getProductStar = function (productId) {
  return db.query(
    `SELECT one_star, two_star, three_star, four_star, five_star FROM rating_star WHERE product_id = ${productId}`
  );
};

exports.getProductsFilter = function (type) {
  console.log(type);
  return db.query(

    `SELECT DISTINCT products.product_id, 
      products.name, 
      products.img_link, 
      products.price, 
      products.trademark, 
      products.offer_percent, 
      products.in_stock,
      types.type
      FROM product_types 
      INNER JOIN products 
      ON product_types.product_id = products.product_id 
      INNER JOIN types 
      ON product_types.type_id = types.type_id 
      INNER JOIN product_colors
      ON product_colors.product_id = products.product_id
      INNER JOIN colors
      ON colors.color_id = product_colors.color_id
      WHERE types.type = '${type}' 
      OR products.trademark = '${type}' 
      OR products.name = '${type}' 
      OR colors.color = '${type}'`
  );
};


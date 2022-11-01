const productsData = require("../data/productsData");

exports.getProducts = function () {
  return productsData.getProducts();
};

exports.getProduct = function (productId) {
  return productsData.getProduct(productId);
};

exports.getProductSize = function (productId) {
  return productsData.getProductSize(productId);
};

exports.getProductStar = async function (productId) {
  let products = await productsData.getProductStar(productId);
  let arrayOfStars = [];
  let totalStars = 0;
  let numberOfStars = 1;
  let ratingStar = 0;

  arrayOfStars[0] = await products[0].one_star;
  arrayOfStars[1] = await products[0].two_star;
  arrayOfStars[2] = await products[0].three_star;
  arrayOfStars[3] = await products[0].four_star;
  arrayOfStars[4] = await products[0].five_star;
  totalStars = await (products[0].one_star +
    products[0].two_star +
    products[0].three_star +
    products[0].four_star +
    products[0].five_star);

  for (let i = 0; i < 5; i++) {
    let aux = ratingStar;
    ratingStar = await arrayOfStars[i];
    if (aux > ratingStar) {
      ratingStar = aux;
    }
  }
  numberOfStars = arrayOfStars.lastIndexOf(ratingStar) + 1;

  let resp = [{ totalStars, numberOfStars }];
  return resp;
};

exports.getProductsFilter = function (type) {
  return productsData.getProductsFilter(type);
};


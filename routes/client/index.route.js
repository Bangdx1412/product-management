const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const categoryMiddlware = require("../../middlewares/client/category.middlware");
const cartMiddlware = require("../../middlewares/client/cart.middleware");
module.exports = (app) => {
  // Sử dụng cho tất cả
  app.use(categoryMiddlware.category);
  app.use(cartMiddlware.cartId);

  // Route
  app.use("/", homeRoute);

  app.use("/products", productRoute);
  app.use("/search", searchRoute);
  app.use("/cart", cartRoute);
  app.use("/checkout", checkoutRoute);
};

const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");
const categoryMiddlware = require("../../middlewares/client/category.middlware");
const cartMiddlware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
module.exports = (app) => {
  // Sử dụng cho tất cả
  app.use(categoryMiddlware.category);
  app.use(cartMiddlware.cartId);
  app.use(userMiddleware.infoUser);

  // Route
  app.use("/", homeRoute);

  app.use("/products", productRoute);
  app.use("/search", searchRoute);
  app.use("/cart", cartRoute);
  app.use("/checkout", checkoutRoute);
  app.use("/user", userRoute);
};

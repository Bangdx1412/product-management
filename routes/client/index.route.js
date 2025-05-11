const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const categoryMiddlware = require("../../middlewares/client/category.middlware");
module.exports = (app) => {
  // Sử dụng cho tất cả
  app.use(categoryMiddlware.category);

  // Route
  app.use("/", homeRoute);

  app.use("/products", productRoute);
};

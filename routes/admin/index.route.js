const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware");
// Nhúng route
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const categoryRoutes = require("./products-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");
const myAccountRoutes = require("./my-account.route");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  // Route
  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRoutes
  );
  app.use(PATH_ADMIN + "/products",authMiddleware.requireAuth, productRoutes);
  app.use(PATH_ADMIN + "/products-category",authMiddleware.requireAuth, categoryRoutes);
  app.use(PATH_ADMIN + "/roles",authMiddleware.requireAuth, roleRoutes);
  app.use(PATH_ADMIN + "/accounts",authMiddleware.requireAuth, accountRoutes);
  app.use(PATH_ADMIN + "/my-account",authMiddleware.requireAuth, myAccountRoutes);
  app.use(PATH_ADMIN + "/auth", authRoutes);
};

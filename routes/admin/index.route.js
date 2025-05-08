const systemConfig = require("../../config/system")

// Nhúng route
const dashboardRoute = require("./dashboard.route")
const productRoute = require("./product.route")
const categoryRoute = require("./products-category.route")

module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin
    // Route
    app.use(PATH_ADMIN + '/dashboard', dashboardRoute)
    app.use(PATH_ADMIN + '/products', productRoute)
    app.use(PATH_ADMIN + '/products-category', categoryRoute)

}
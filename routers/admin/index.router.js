const productsRouter = require('./product.router');
const dashboardRouter = require('./dashboard.router');
const PATHAdmin = require('../../config/system');
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.router");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");

module.exports = (app) => {
    app.use(PATHAdmin.prefixAdmin + "/products", productsRouter);
    app.use(PATHAdmin.prefixAdmin + "/dashboard", dashboardRouter);
    app.use(PATHAdmin.prefixAdmin + "/products-category", productCategoryRoutes);
    app.use(PATHAdmin.prefixAdmin + "/roles", roleRoutes);
    app.use(PATHAdmin.prefixAdmin + "/accounts", accountRoutes);
    app.use(PATHAdmin.prefixAdmin + "/auth", authRoutes);
}
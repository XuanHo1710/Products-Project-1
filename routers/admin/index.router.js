const productsRouter = require('./product.router');
const dashboardRouter = require('./dashboard.router');
const PATHAdmin = require('../../config/system');
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.router");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware");
const settingRoutes = require("./setting.route");

const myAccountRoutes = require("./my-account.route");


module.exports = (app) => {
    app.use(PATHAdmin.prefixAdmin + "/products",authMiddleware.requireAuth, productsRouter);
    app.use(
        PATHAdmin.prefixAdmin + "/dashboard",
        authMiddleware.requireAuth,
        dashboardRouter
    );
    app.use(PATHAdmin.prefixAdmin + "/products-category", authMiddleware.requireAuth, productCategoryRoutes);
    app.use(PATHAdmin.prefixAdmin + "/roles", authMiddleware.requireAuth, roleRoutes);
    app.use(PATHAdmin.prefixAdmin + "/accounts", authMiddleware.requireAuth, accountRoutes);
    app.use(PATHAdmin.prefixAdmin + "/auth", authRoutes);
    app.use(PATHAdmin.prefixAdmin + "/my-account", authMiddleware.requireAuth, myAccountRoutes);


    app.use(PATHAdmin.prefixAdmin + "/settings", authMiddleware.requireAuth, settingRoutes);
}
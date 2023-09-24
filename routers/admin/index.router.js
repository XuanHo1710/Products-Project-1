const productsRouter = require('./product.router');
const dashboardRouter = require('./dashboard.router');
const PATHAdmin = require('../../config/system');
const productCategoryRoutes = require("./product-category.route");
module.exports = (app) => {
    app.use(PATHAdmin.prefixAdmin + "/products", productsRouter);
    app.use(PATHAdmin.prefixAdmin + "/dashboard", dashboardRouter);
    app.use(PATHAdmin.prefixAdmin + "/products-category", productCategoryRoutes);
}
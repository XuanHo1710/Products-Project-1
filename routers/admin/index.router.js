const productsRouter = require('./products.router');
const dashboardRouter = require('./dashboard.router');
const PATHAdmin = require('../../config/system');
module.exports = (app) => {
    app.use(PATHAdmin.prefixAdmin + "/products", productsRouter);
    app.use(PATHAdmin.prefixAdmin + "/dashboard", dashboardRouter);
}
const RouterProduct = require('./product.router')
const RouterHome = require('./home.router')

const categoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports = (app) => {
    app.use(categoryMiddleware.category);


    app.use('/', RouterHome);
    app.use('/products', RouterProduct);
}
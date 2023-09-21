const RouterProduct = require('./product.router')
const RouterHome = require('./home.router')
module.exports = (app) => {
    app.use('/', RouterHome);
    app.use('/products', RouterProduct);
}
const RouterProduct = require('./product.router')
const RouterHome = require('./home.router')

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const searchRoutes = require("./search.route");

const cartMiddleware = require("../../middlewares/client/cart.middleware");
const cartRoutes = require("./cart.route");


const checkoutRoutes = require("./checkout.route");

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);

    app.use("/search", searchRoutes);

    app.use('/', RouterHome);
    app.use('/products', RouterProduct);

    app.use("/cart", cartRoutes);

    
    app.use("/checkout", checkoutRoutes);
}
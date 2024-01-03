const RouterProduct = require('./product.router')
const RouterHome = require('./home.router')

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const searchRoutes = require("./search.route");

const cartMiddleware = require("../../middlewares/client/cart.middleware");
const cartRoutes = require("./cart.route");

const userRoutes = require("./user.route");
const userMiddleware = require("../../middlewares/client/user.middleware");


const checkoutRoutes = require("./checkout.route");

const settingMiddleware = require("../../middlewares/client/setting.middleware");

const chatRoutes = require("./chat.route");

const authMiddleware = require("../../middlewares/client/auth.middleware");


const usersRoutes = require("./users.route");

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.settingGeneral);

    app.use("/search", searchRoutes);

    app.use('/', RouterHome);
    app.use('/products', RouterProduct);

    app.use("/cart", cartRoutes);

    
    app.use("/checkout", checkoutRoutes);

    app.use("/user", userRoutes);

    app.use("/chat", authMiddleware.requireAuth, chatRoutes);

    app.use("/users", authMiddleware.requireAuth, usersRoutes);
}
const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

require('dotenv').config();

const app = express();
const post = process.env.PORT;
app.use(methodOverride("_method"));

const router = require('./routers/client/index.router');
const routerAdmin = require('./routers/admin/index.router');
const mongoose = require('./config/database');
const systemConfig = require('./config/system');
mongoose.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Flash
app.use(cookieParser("JHGJKLKLGFLJK"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

routerAdmin(app);
router(app);

app.listen(post, () => {
    console.log(`Thanh cong !!`);
})
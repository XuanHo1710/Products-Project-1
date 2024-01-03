const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

const http = require('http');
const { Server } = require("socket.io");

const path = require("path");

require('dotenv').config();

const app = express();
const post = process.env.PORT;
app.use(methodOverride("_method"));



const moment = require("moment");

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
app.locals.moment = moment;

// TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
  );
  
// End TinyMCE

// Flash
app.use(cookieParser("JHGJKLKLGFLJK"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash


// SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
// End SocketIO

routerAdmin(app);
router(app);


app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    pageTitle: "404 Not Found",
  });
});

server.listen(post, () => {
    console.log(`App listening on port ${post}`);
})


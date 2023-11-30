const Express = require('express')
const appRouter = require('./routes/appRouter.js')
const { create } = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
//const flash = require('connect-flash')
const session = require('express-session')
const expressMySQLSession = require('express-mysql-session')
const pool = require('./database.js')
const { SECRET, database } = require('./config.js')
const { promiseConnectFlash } = require("async-connect-flash");
const cookieParser = require("cookie-parser");
const passport = require('passport')


const MySQLStore = expressMySQLSession(session);
const app = Express()
require('./lib/passport.js')

app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    create({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: require('./lib/handlebars.js')
    }).engine
);
app.set("view engine", ".hbs");

//middleware
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, pool)
}))
app.use(promiseConnectFlash());
app.use(morgan("dev"));
app.use(Express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(Express.json())


//Global variables

app.use(async (req, res, next) => {
    app.locals.success = await req.getFlash("success");
    app.locals.error = await req.getFlash("error");
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes/index.js'))
app.use(require('./routes/appRouter.js'))
app.use(require('./routes/auth.js'))
app.use('/conctract', require('./routes/contract'))

app.use(Express.static(path.join(__dirname, 'public')));

//Routes
app.use(appRouter)



//export app
module.exports = app


const Express = require('express')
const appRouter = require('./routes/appRouter.js')
const { create, helpers } = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')

const app = Express()

app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    create({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: require('./lib/handlebars')
    }).engine
);
app.set("view engine", ".hbs");

//middleware
app.use(morgan("dev"));
//app.use(Express.urlencoded({ extends: false }))
app.use(Express.json())

//Global variables
app.use(async (req, res, next) => {

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


const Express = require('express')
const encryptPassword = require('../lib/helpers.js')
const passport = require('../lib/passport.js')

const authRouter = Express.Router()

authRouter.get('/signup', (req, res) => {
    res.render('auth/signup')
})

authRouter.get('/signin', (req, res) => {
    res.render('auth/signin')
})

authRouter.post('/signup', (req, res, next) => {

    console.log(req.body)

    res.send('enviado desde signup')

})

authRouter.post('/signup', async (req, res, next) => {
    const { fullname, email, password1 } = req.body;

    const password = await encryptPassword(password1);

    // Saving in the Database
    const [result] = await pool.query("INSERT INTO users SET ? ", {
        fullname,
        email,
        password,
    });

    req.login(
        {
            id: result.insertId,
            fullname,
            email,
        },
        (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/links");
        }
    );
})
/*
const signIn = passport.authenticate("local.signin", {
    successRedirect: "/links",
    failureRedirect: "/signin",
    passReqToCallback: true,
    failureFlash: true,
});
*/
const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect("/");
    });
};

module.exports = authRouter
const express = require('express');
const router = express.Router();
const { isLoggedIn, isNoLoggedIn } = require('../lib/auth');
const { signupSchema, signinSchema } = require('../schemas/auth.schema.js')
const validator = require('../middlewares/validator.middleware.js')


const passport = require('passport')

// SIGNUP---------------------------------------------
router.get('/signup', isNoLoggedIn, (req, res) => {
    res.render('auth/signup');
});

/*
router.post('/signup', (req, res) => {
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })
    //console.log(req.body)
    res.send('recibido');
});
*/

router.post('/signup', isNoLoggedIn, validator(signupSchema), passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));


// SINGIN---------------------------------------------
router.get('/signin', (req, res) => {

    res.render('auth/signin');
});

router.post('/signin', isNoLoggedIn, validator(signinSchema), (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

//SESSION PROFILE---------------------------------------
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('partials/profile');
});

//SESSION LOGOUT----------------------------------------
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect("/signin");
    });
});

module.exports = router;
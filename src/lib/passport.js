const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../database.js");
const matchPassword = require("./helpers.js");

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    }, async (req, usernameField, password, donde) => {

      console.log(req.body)

    }))

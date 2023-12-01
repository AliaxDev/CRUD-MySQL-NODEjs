const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database.js");
const helpers = require("./helpers.js");

//SIGNUP----------------------------
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true

    }, async (req, username, password, done) => {

      //console.log(req.body)

      const [row] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
      console.log(row)

      if (!row.length) {
        console.log('ususario no encontrado')
        let error = 'User not found'
        return done(null, false, req.setFlash('message', error));
      }

      const user = row[0];
      const validPassword = await helpers.matchPassword(password, user.password);

      if (!validPassword) {
        console.log('password incorrecta')
        let error = 'Incorrect Password'
        await req.setFlash('message', error)
        return done(null, false,);
      }

      done(null, user);
      //console.log(result)
    }))


//SIGNUP----------------------------
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,

    }, async (req, username, password, done) => {

      //console.log(req.body)

      const { fullname } = req.body
      const newUser = {
        username,
        password,
        fullname
      }

      newUser.password = await helpers.encryptPassword(password)

      const [result] = await pool.query('INSERT INTO users SET ?', [newUser])
      console.log('user guardado')
      //console.log(result)
      newUser.id = result.insertId
      return done(null, newUser)
    }))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  return done(null, rows[0])
})





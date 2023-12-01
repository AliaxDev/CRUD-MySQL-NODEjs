const Express = require('express')
const pool = require('../database.js')

const indexRouter = Express.Router()

indexRouter.get('/', async (req, res) => {
    res.render('index')
})

module.exports = indexRouter
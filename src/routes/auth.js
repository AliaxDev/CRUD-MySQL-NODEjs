const Express = require('express')

const authRouter = Express.Router()

authRouter.get('/login', (req, res) => {
    res.send('asd')
})

module.exports = authRouter
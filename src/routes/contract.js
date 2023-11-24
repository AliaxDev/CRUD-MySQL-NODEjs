const Express = require('express')

const contractRouter = Express.Router()

contractRouter.get('/', (req, res) => {
    res.send('contract')
})

contractRouter.get('/add', (req, res) => {

    res.render('links/add')
})

module.exports = contractRouter
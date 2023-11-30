const Express = require('express')

const indexRouter = require('./index.js')
const authRouter = require('./auth.js')
const contractRouter = require('./contract.js')



const appRouter = Express.Router()

appRouter.use(indexRouter)
appRouter.use(authRouter)
appRouter.use('/contract', contractRouter)

module.exports = appRouter
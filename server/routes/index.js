const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const bankWindowRouter = require('./bankWindowRouter')
const talonRouter = require('./talonRouter')

router.use('/user', userRouter)
router.use('/bankWindow', bankWindowRouter)
router.use('/talon', talonRouter)

module.exports = router
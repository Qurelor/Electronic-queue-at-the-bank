const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const bankWindowRouter = require('./bankWindowRouter')
const talonRouter = require('./talonRouter')
const cashierRouter = require('./cashierRouter')
const serviceRouter = require('./serviceRouter')

router.use('/user', userRouter)
router.use('/bankWindow', bankWindowRouter)
router.use('/talon', talonRouter)
router.use('/cashier', cashierRouter)
router.use('/service', serviceRouter)

module.exports = router
const Router = require('express')
const router = new Router()
const CashierController = require('../controllers/cashierController')

router.post('/create', CashierController.create)
router.get('/getIdByUserId/:userId', CashierController.getIdByUserId)

module.exports = router
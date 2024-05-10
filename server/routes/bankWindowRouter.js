const Router = require('express')
const router = new Router()
const BankWindowController = require('../controllers/bankWindowController')

router.post('/create', BankWindowController.create)
router.get('/getAll', BankWindowController.getAll)
router.post('/setCashierId', BankWindowController.setCashierId)
router.get('/getNumberById/:id', BankWindowController.getNumberById)
router.get('/getAllWithoutCashier', BankWindowController.getAllWithoutCashier)
router.get('/getAllWithCashier', BankWindowController.getAllWithCashier)
router.get('/getCashierIdById/:id', BankWindowController.getCashierIdById)

module.exports = router
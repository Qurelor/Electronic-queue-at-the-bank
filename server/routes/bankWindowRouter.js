const Router = require('express')
const router = new Router()
const BankWindowController = require('../controllers/bankWindowController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware('ADMIN'), BankWindowController.create)
router.get('/getAll', BankWindowController.getAll)
router.post('/setCashierId', checkRoleMiddleware('CASHIER'), BankWindowController.setCashierId)
router.get('/getNumberById/:id', BankWindowController.getNumberById)
router.get('/getAllWithoutCashier', BankWindowController.getAllWithoutCashier)
router.get('/getAllWithCashier', BankWindowController.getAllWithCashier)
router.get('/getCashierIdById/:id', BankWindowController.getCashierIdById)
router.get('/getByCashierId/:cashierId', BankWindowController.getByCashierId)
router.post('/setStatus', checkRoleMiddleware('CASHIER'), BankWindowController.setStatus)

module.exports = router
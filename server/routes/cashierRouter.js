const Router = require('express')
const router = new Router()
const CashierController = require('../controllers/cashierController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/create', checkRoleMiddleware('ADMIN'), CashierController.create)
router.get('/getIdByUserId/:userId', CashierController.getIdByUserId)
router.get('/getAll', CashierController.getAll)
router.get('/getUserIdById/:id', CashierController.getUserIdById)

module.exports = router
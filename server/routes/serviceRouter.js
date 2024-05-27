const Router = require('express')
const router = new Router()
const ServiceController = require('../controllers/serviceController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/add', checkRoleMiddleware('ADMIN'), ServiceController.add)
router.get('/getAll', ServiceController.getAll)
router.get('/getTypesByIds/:ids', ServiceController.getTypesByIds)
router.post('/setCashierId', checkRoleMiddleware('ADMIN'), ServiceController.setCashierId)
router.get('/getAllWithoutCashier', ServiceController.getAllWithoutCashier)
router.get('/getIdsByCashierId/:cashierId', ServiceController.getIdsByCashierId)
router.get('/getAllByCashierId/:cashierId', ServiceController.getAllByCashierId)

module.exports = router
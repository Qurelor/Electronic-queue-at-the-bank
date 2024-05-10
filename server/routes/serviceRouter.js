const Router = require('express')
const router = new Router()
const ServiceController = require('../controllers/serviceController')

router.post('/add', ServiceController.add)
router.get('/getAll', ServiceController.getAll)
router.get('/getTypesByIds/:ids', ServiceController.getTypesByIds)
router.post('/setCashierId', ServiceController.setCashierId)
router.get('/getAllWithoutCashier', ServiceController.getAllWithoutCashier)
router.get('/getIdsByCashierId/:cashierId', ServiceController.getIdsByCashierId)

module.exports = router
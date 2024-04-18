const Router = require('express')
const router = new Router()
const CashierServiceController = require('../controllers/cashierServiceController')

router.post('/addServices', CashierServiceController.addServices)
router.get('/getServiceIdsByCashierId/:cashierId', CashierServiceController.getServiceIdsByCashierId)

module.exports = router
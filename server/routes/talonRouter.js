const Router = require('express')
const router = new Router()
const TalonController = require('../controllers/talonController')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/create', checkAuthMiddleware, TalonController.create)
router.get('/getMaxNumberByServiceId/:serviceId', TalonController.getMaxNumberByServiceId)
router.get('/getAll/', TalonController.getAll)
router.post('/setBankWindowId', checkRoleMiddleware('CASHIER'), TalonController.setBankWindowId)
router.post('/setStatus', checkAuthMiddleware, TalonController.setStatus)
router.get('/getServicedTalonByBankWindowId/:bankWindowId', TalonController.getServicedTalonByBankWindowId)
router.get('/getUnservicedTalonByUserId/:userId', TalonController.getUnservicedTalonByUserId)
router.get('/getLastTalonByUserId/:userId', TalonController.getLastTalonByUserId)

module.exports = router
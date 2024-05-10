const Router = require('express')
const router = new Router()
const TalonController = require('../controllers/talonController')

router.post('/create', TalonController.create)
router.get('/getMaxNumberByServiceId/:serviceId', TalonController.getMaxNumberByServiceId)
router.get('/getAll/', TalonController.getAll)
router.post('/setBankWindowId', TalonController.setBankWindowId)
router.post('/setStatus', TalonController.setStatus)
router.get('/getServicedTalonByBankWindowId/:bankWindowId', TalonController.getServicedTalonByBankWindowId)
router.get('/getUnservicedTalonByUserId/:userId', TalonController.getUnservicedTalonByUserId)
router.get('/getLastTalonByUserId/:userId', TalonController.getLastTalonByUserId)

module.exports = router
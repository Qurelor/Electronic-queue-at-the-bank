const Router = require('express')
const router = new Router()
const TalonController = require('../controllers/talonController')

router.post('/create', TalonController.create)
router.get('/getMaxNumberByServiceId/:serviceId', TalonController.getMaxNumberByServiceId)
router.get('/getAll/:serviceIds', TalonController.getAll)
router.post('/setBankWindowId', TalonController.setBankWindowId)
router.post('/setIsActual', TalonController.setIsActualFalse)

module.exports = router
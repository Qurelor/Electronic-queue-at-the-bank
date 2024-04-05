const Router = require('express')
const router = new Router()
const TalonController = require('../controllers/talonController')

router.post('/create', TalonController.create)
router.get('/getMaxNumberByType/:type', TalonController.getMaxNumberByType)
router.get('/getAll', TalonController.getAll)

module.exports = router
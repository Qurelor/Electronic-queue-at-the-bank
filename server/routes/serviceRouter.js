const Router = require('express')
const router = new Router()
const ServiceController = require('../controllers/serviceController')

router.post('/add', ServiceController.add)
router.get('/getAll', ServiceController.getAll)
router.get('/getTypesByIds/:ids', ServiceController.getTypesByIds)

module.exports = router
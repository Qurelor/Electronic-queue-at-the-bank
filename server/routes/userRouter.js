const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')

router.post('/registration', UserController.registration)
router.post('/auth', UserController.auth)
router.get('/getAll', UserController.getAll)

module.exports = router
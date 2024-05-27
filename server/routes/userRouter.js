const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

router.post('/registration', UserController.registration)
router.post('/auth', UserController.auth)
router.get('/getAll', checkRoleMiddleware('ADMIN'), UserController.getAll)
router.post('/checkToken', UserController.checkToken)
router.get('/getFullNameById/:id', UserController.getFullNameById)

module.exports = router
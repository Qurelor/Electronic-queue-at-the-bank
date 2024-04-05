const Router = require('express')
const router = new Router()
const BankWindowController = require('../controllers/bankWindowController')

router.post('/create', BankWindowController.create)
router.get('/getAll', BankWindowController.getAll)
router.post('/setUserId', BankWindowController.setUserId)

module.exports = router
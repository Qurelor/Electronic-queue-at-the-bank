const {Cashier} = require('../models/cashierModel')

class CashierController {
    async create(req, res) {
        const {userId} = req.body
        const cashier = await Cashier.create({userId})
        return res.json(cashier)
    }

    async getIdByUserId(req, res) {
        const {userId} = req.params
        const cashier = await Cashier.findOne({where: {userId}})
        return res.json(cashier.id)
    }
}

module.exports = new CashierController()
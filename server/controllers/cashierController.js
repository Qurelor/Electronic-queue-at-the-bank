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

    async getAll(req, res) {
        const {cashierId} = req.query;
        const cashiers = await Cashier.findAll()
        if(cashierId) {
            const cashier = await Cashier.findOne({where: {id: bankWindowId}})
            return res.json(cashier)
        }
        return res.json(cashiers)
    }

    async getUserIdById(req, res) {
        const {id} = req.params
        const cashier = await Cashier.findOne({where: {id}})
        return res.json(cashier.userId)
    }
}

module.exports = new CashierController()
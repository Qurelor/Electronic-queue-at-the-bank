const { BankWindow } = require("../models/models")

class BankWindowController {
    async create(req, res) {
        const {number} = req.body
        if(await BankWindow.findOne({where: {number}})){
            return res.send('Окно с таким номером уже существует')
        }
        const bankWindow = await BankWindow.create({number})
        return res.json(bankWindow)
    }

    async getAll(req, res) {
        const {sortName, sortDirection} = req.query;
        const bankWindows = await BankWindow.findAll({order: [[sortName, sortDirection.toUpperCase()]]})
        return res.json(bankWindows)
    }

    async setUserId(req, res) {
        const {number, userId} = req.body
        const bankWindow = await BankWindow.update({userId}, {where: {number}})
        return res.json(bankWindow)
    }
}

module.exports = new BankWindowController()
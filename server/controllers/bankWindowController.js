const {BankWindow} = require('../models/bankWindowModel')
const { Op } = require("sequelize");

class BankWindowController {
    async create(req, res) {
        const {number} = req.body
        if (await BankWindow.findOne({where: {number}})) {
            return res.send('Окно с таким номером уже существует')
        }
        const bankWindow = await BankWindow.create({number})
        return res.json(bankWindow)
    }

    async getAll(req, res) {
        const {sortName, sortDirection, bankWindowId} = req.query;
        const bankWindows = await BankWindow.findAll({order: [[sortName, sortDirection.toUpperCase()]]})
        if(bankWindowId) {
            const bankWindow = await BankWindow.findAll({where: {id: bankWindowId}})
            return res.json(bankWindow)
        }
        return res.json(bankWindows)
    }

    async setCashierId(req, res) {
        const {id, cashierId} = req.body
        const bankWindow = await BankWindow.update({cashierId}, {where: {id}})
        return res.json(bankWindow)
    }

    async getNumberById(req, res) {
        const {id} = req.params
        const bankWindow = await BankWindow.findOne({where: {id}})
        return res.json(bankWindow.number)
    }

    async getAllWithoutCashier(req, res) {
        const {sortName, sortDirection} = req.query;
        const bankWindows = await BankWindow.findAll({where: {cashierId: null}, order: [[sortName, sortDirection.toUpperCase()]]})
        return res.json(bankWindows)
    }

    async getAllWithCashier(req, res) {
        const {sortName, sortDirection} = req.query;
        const bankWindows = await BankWindow.findAll({where: {cashierId: {[Op.not]: null}}, order: [[sortName, sortDirection.toUpperCase()]]})
        return res.json(bankWindows)
    }

    async getCashierIdById(req, res) {
        const {id} = req.params
        const bankWindow = await BankWindow.findOne({where: {id}})
        return res.json(bankWindow.cashierId)
    }

    async getByCashierId(req, res) {
        const {cashierId} = req.params
        const bankWindow = await BankWindow.findOne({where: {cashierId}})
        return res.json(bankWindow)
    }

    async setStatus(req, res) {
        const {id, status} = req.body
        await BankWindow.update({status}, {where: {id}})
        const bankWindow = await BankWindow.findOne({where: {id}})
        return res.json(bankWindow)
    }
}

module.exports = new BankWindowController()
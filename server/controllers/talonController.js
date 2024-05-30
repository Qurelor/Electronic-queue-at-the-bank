const e = require('express');
const {Talon} = require('../models/talonModel')
const { Op } = require("sequelize");

class TalonController {
    async create(req, res) {
        const {number, status, serviceId} = req.body
        const user = req.user
        const talon = await Talon.create({number, status, serviceId, userId: user.id})
        return res.json(talon)
    }

    async getMaxNumberByServiceId(req, res) {
        const {serviceId} = req.params
        const maxNumber = await Talon.max('number', {where: {serviceId}})
        return res.json(maxNumber)
    }

    async getAll(req, res) {
        const {serviceIds, status, bankWindowId} = req.query;
        if(serviceIds && status) {
            const talons = await Talon.findAll({where: {serviceId: serviceIds, status}})
            return res.json(talons)
        } else if (serviceIds) {
            const talons = await Talon.findAll({where: {serviceId: serviceIds}})
            return res.json(talons)
        } else if (status) {
            const talons = await Talon.findAll({where: {status}})
            return res.json(talons)
        } else {
            const talons = await Talon.findAll()
            return res.json(talons)
        }
    }

    async setBankWindowId(req, res) {
        const {id, bankWindowId} = req.body
        const talon = await Talon.update({bankWindowId}, {where: {id}})
        return res.json(talon)
    }

    async setStatus(req, res) {
        const {id, status, bankWindowId} = req.body
        const talon = await Talon.findOne({where: {id}})
        if (status == 'отменён' && (talon.status == 'готов к обслуживанию' || talon.status == 'обслуживается')) {
            return res.send('талон уже обслуживается')
        } else if (status == 'отменён' && (talon.status == 'не явился' || talon.status == 'обслужен')) {
            return res.send('талон уже обслужен')
        } else if (talon.status == 'отменён') {
            return res.send('талон уже отменён')
        } else {
            await Talon.update({status, bankWindowId}, {where: {id}})
            talon.status = status
            return res.json(talon)
        }
    }

    async getAllByServiceId(req, res) {
        const {serviceIds} = req.query;
        if(!serviceIds) {
            const talons = await Talon.findAll()
            return res.json(talons)
        } else {
            const talons = await Talon.findAll({where: {serviceId: serviceIds}})
            return res.json(talons)
        }
    }

    async getServicedTalonByBankWindowId(req, res) {
        const {bankWindowId} = req.params;
        const talon = await Talon.findOne({where: {bankWindowId, status: { [Op.or]: ['готов к обслуживанию', 'обслуживается']}}})
        return res.json(talon)
    }

    async getUnservicedTalonByUserId(req, res) {
        const {userId} = req.params;
        const talon = await Talon.findOne({where: {userId, status: { [Op.or]: ['ожидание', 'готов к обслуживанию', 'обслуживается']}}})
        return res.json(talon)
    }

    async getLastTalonByUserId(req, res) {
        const {userId} = req.params;
        const lastTalon = await Talon.findOne({where: {userId}, order: [['id', 'DESC']]})
        return res.json(lastTalon)
    }
}

module.exports = new TalonController()
const {Talon} = require('../models/talonModel')
const { Op } = require("sequelize");

class TalonController {
    async create(req, res) {
        const {number, serviceId, userId} = req.body
        const talon = await Talon.create({number, isActual: true, serviceId, userId})
        return res.json(talon)
    }

    async getMaxNumberByServiceId(req, res) {
        const {serviceId} = req.params
        const maxNumber = await Talon.max('number', {where: {serviceId}})
        return res.json(maxNumber)
    }

    async getAll(req, res) {
        const {serviceIds} = req.params;
        const serviceIdsArray = serviceIds.split(',')
        const talons = await Talon.findAll({where: {serviceId: serviceIdsArray}})
        return res.json(talons)
    }

    async setBankWindowId(req, res) {
        const {id, bankWindowId} = req.body
        const talon = await Talon.update({bankWindowId}, {where: {id}})
        return res.json(talon)
    }

    async setIsActualFalse(req, res) {
        const {id} = req.body
        const talon = await Talon.update({isActual: false}, {where: {id}})
        return res.json(talon)
    }
}

module.exports = new TalonController()
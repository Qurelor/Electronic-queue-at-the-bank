const {Talon} = require("../models/talonModel")

class TalonController {
    async create(req, res) {
        const {type, number, userId} = req.body
        const talon = await Talon.create({type, number, isActual: true, userId})
        return res.json(talon)
    }

    async getMaxNumberByType(req, res) {
        const {type} = req.params
        const maxNumber = await Talon.max('number', {where: {type}})
        return res.json(maxNumber)
    }

    async getAll(req, res) {
        const {types} = req.query;
        if (!types) {
            const talons = await Talon.findAll()
            return res.json(talons)
        } else {
            const talons = await Talon.findAll()
            return res.json(talons)
        }
    }
}

module.exports = new TalonController()
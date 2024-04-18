const {Service} = require('../models/serviceModel')
const { Op } = require("sequelize");

class ServiceController {
    async add(req, res) {
        const {type, description} = req.body
        if(await Service.findOne({where: {type}}) && await Service.findOne({where: {description: {[Op.iLike]: description}}})){
            return res.send('Услуги с таким типом и описанием уже существуют')
        }
        if (await Service.findOne({where: {type}})) {
            return res.send('Услуга с таким типом уже существует')
        }
        if (await Service.findOne({where: {description: {[Op.iLike]: description}}})) {
            return res.send('Услуга с таким описанием уже существует')
        }
        const service = await Service.create({type, description})
        return res.json(service)
    }

    async getAll(req, res) {
        const {sortName, sortDirection} = req.query;
        const services = await Service.findAll({order: [[sortName, sortDirection.toUpperCase()]]})
        return res.json(services)
    }

    async getTypesByIds(req, res) {
        const {ids} = req.params
        const idsArray = ids.split(',')
        const services = await Service.findAll({where: {id: idsArray}})
        const typesArray = []
        services.map(service => typesArray.push(service.type))
        return res.json(typesArray)
    }
}

module.exports = new ServiceController()
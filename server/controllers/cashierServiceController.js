const {CashierService} = require('../models/cashierServiceModel')

class CashierServiceController {
    async addServices(req, res) {
        const {cashierId} = req.body
        const {serviceIds} = req.body
        serviceIds.map(async serviceId => await CashierService.create({cashierId, serviceId: serviceId}))
        return res.json()
    }

    async getServiceIdsByCashierId(req, res) {
        const {cashierId} = req.params
        const cashiersServices = await CashierService.findAll({where: {cashierId}})
        const serviceIds = []
        cashiersServices.map(async cashierService => serviceIds.push(cashierService.serviceId))
        return res.json(serviceIds)
    }
}

module.exports = new CashierServiceController()
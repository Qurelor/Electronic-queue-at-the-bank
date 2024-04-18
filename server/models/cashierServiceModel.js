const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const CashierService = sequelize.define('cashiers_services', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
}, {freezeTableName: true})

module.exports = {CashierService}
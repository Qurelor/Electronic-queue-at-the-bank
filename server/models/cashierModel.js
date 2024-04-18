const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Cashier = sequelize.define('cashier', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

module.exports = {Cashier}
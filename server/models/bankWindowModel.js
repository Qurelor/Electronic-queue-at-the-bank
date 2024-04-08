const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const BankWindow = sequelize.define('bank_window',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, unique: true, allowNull: false}
})

module.exports = {BankWindow}
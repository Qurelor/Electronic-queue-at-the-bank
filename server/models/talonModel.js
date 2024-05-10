const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Talon = sequelize.define('talon', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {Talon}
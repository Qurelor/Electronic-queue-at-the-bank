const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Talon = sequelize.define('talon',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false},
    number: {type: DataTypes.INTEGER, allowNull: false},
    isActual: {type: DataTypes.BOOLEAN, allowNull: false}
})

module.exports = {Talon}
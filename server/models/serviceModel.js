const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Service = sequelize.define('service', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {Service}
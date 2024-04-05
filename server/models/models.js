const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER', allowNull: false}
})

const BankWindow = sequelize.define('bank_window',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, unique: true, allowNull: false}
})

const Talon = sequelize.define('talon',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false},
    number: {type: DataTypes.STRING, allowNull: false},
    isActual: {type: DataTypes.BOOLEAN, allowNull: false}
})

User.hasOne(BankWindow)
BankWindow.belongsTo(User)

User.hasMany(Talon)
Talon.belongsTo(User)

BankWindow.hasOne(Talon)
Talon.belongsTo(BankWindow)

module.exports = {
    User,
    Talon,
    BankWindow
}
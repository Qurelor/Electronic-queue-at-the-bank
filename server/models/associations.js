const {User} = require('./userModel')
const {BankWindow} = require('./bankWindowModel')
const {Talon} = require('./talonModel')
const {Cashier} = require('./cashierModel')
const {Service} = require('./serviceModel')

Service.hasOne(Talon)
Talon.belongsTo(Service)

User.hasOne(Cashier)
Cashier.belongsTo(User)

User.hasMany(Talon)
Talon.belongsTo(User)

Cashier.hasOne(BankWindow)
BankWindow.belongsTo(Cashier)

Cashier.hasMany(Service)
Service.belongsTo(Cashier)

BankWindow.hasMany(Talon)
Talon.belongsTo(BankWindow)
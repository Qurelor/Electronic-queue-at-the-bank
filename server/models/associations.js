const {User} = require('./userModel')
const {BankWindow} = require('./bankWindowModel')
const {Talon} = require('./talonModel')
const {Cashier} = require('./cashierModel')
const {Service} = require('./serviceModel')
const {CashierService} = require('./cashierServiceModel')

Service.hasOne(Talon)
Talon.belongsTo(Service)

User.hasOne(Cashier)
Cashier.belongsTo(User)

User.hasMany(Talon)
Talon.belongsTo(User)

Cashier.hasOne(BankWindow)
BankWindow.belongsTo(Cashier)

Cashier.belongsToMany(Service, {through: CashierService})
Service.belongsToMany(Cashier, {through: CashierService})

BankWindow.hasOne(Talon)
Talon.belongsTo(BankWindow)
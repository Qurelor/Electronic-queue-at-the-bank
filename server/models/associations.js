const {User} = require('./userModel')
const {BankWindow} = require('./bankWindowModel')
const {Talon} = require('./talonModel')

User.hasOne(BankWindow)
BankWindow.belongsTo(User)

User.hasMany(Talon)
Talon.belongsTo(User)

BankWindow.hasOne(Talon)
Talon.belongsTo(BankWindow)
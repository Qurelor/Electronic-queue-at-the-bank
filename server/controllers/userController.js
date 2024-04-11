const {User} = require('../models/userModel')

class UserController {
    async registration(req, res) {
        const {fullName, email, password, role} = req.body
        if(await User.findOne({where: {email}})){
            return res.send('Пользователь с таким адресом электронной почты уже существует')
        }
        const user = await User.create({fullName, email, password, role})
        return res.json(user)
    }

    async auth(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(user){
            if (user.password == password) {
                return res.json(user)
            }
        }
        return res.send('Неправильный адрес электронной почты или пароль')
    }

    async getAll(req, res) {
        const {sortName, sortDirection} = req.query;
        const users = await User.findAll({order: [[sortName, sortDirection.toUpperCase()]]})
        return res.json(users)
    }
}

module.exports = new UserController()
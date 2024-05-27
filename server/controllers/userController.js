const {User} = require('../models/userModel')
const jwt = require('jsonwebtoken')

const secretKey = 'wwople2jekfc2'

class UserController {
    async registration(req, res) {
        const {fullName, email, password, role} = req.body
        if (await User.findOne({where: {email}})) {
            return res.send('Пользователь с таким адресом электронной почты уже существует')
        }
        const user = await User.create({fullName, email, password, role})
        const token = jwt.sign({id: user.id, fullName, email, password, role}, secretKey)
        return res.json({token})
    }

    async auth(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (user) {
            if (user.password == password) {
                const token = jwt.sign({id: user.id, role: user.role}, secretKey)
                return res.json({token})
            }
        }
        return res.send('Неправильный адрес электронной почты или пароль')
    }

    async getAll(req, res) {
        const {sortName, sortDirection} = req.query;
        const users = await User.findAll({order: [[sortName, sortDirection.toUpperCase()]]})
        return res.json(users)
    }
    
    async checkToken(req, res) {
        const {token} = req.body
        if(!token) {
            return res.send('Пользователь не авторизован')
        }
        try {
            const decodedToken = jwt.verify(token, secretKey)
            res.send(decodedToken)
        } catch (e) {
            res.send('Пользователь не авторизован')
        }
    }

    async getFullNameById(req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        return res.json(user.fullName)
    }
}

module.exports = new UserController()
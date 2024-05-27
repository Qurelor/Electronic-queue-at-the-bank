const jwt = require('jsonwebtoken')
const constants = require('../constants')

module.exports = function(role) {
    return function (req, res, next) {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.send('Не авторизован')
        }
        try {
            const decodedToken = jwt.verify(token, constants.secretKey)
            if (decodedToken.role != role) {
                return res.send('Нет доступа')
            }
            req.user = decodedToken
            next()
        } catch (e) {
            res.send('Не авторизован')
        }
    }
}
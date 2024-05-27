const jwt = require('jsonwebtoken')
const constants = require('../constants')

module.exports = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
        return res.send('Пользователь не авторизован')
    }
    try {
        const decodedToken = jwt.verify(token, constants.secretKey)
        req.user = decodedToken
        next()
    } catch (e) {
        res.send('Пользователь не авторизован')
    }
}
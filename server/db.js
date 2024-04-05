const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'bank',
    'root',
    'root',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
)
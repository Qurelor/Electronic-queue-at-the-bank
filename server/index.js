const express = require('express')
const sequelize = require('./db')
const associations = require('./models/associations')
const PORT = 5000
const router = require('./routes/index')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${5000}`))
    } catch (e) {
        console.log(e)
    }
}

start()
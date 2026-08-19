const express = require('express')
require('dotenv').config()
const connection = require('./database')

const app = express()
app.use(express.json())

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
    console.log(process.env.NODE_ENV, "the node environment")
})

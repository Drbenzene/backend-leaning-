require('dotenv').config()
const express = require('express')
const userRotes = require("./routes/userRoutes")

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.use("/api/users", userRotes)

app.get('/', (req, res) => {
    res.json({ message: 'server is running' })
})

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})

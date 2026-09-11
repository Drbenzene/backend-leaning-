require('dotenv').config()
const express = require('express')
const userRotes = require("./routes/userRoutes")
const redisClient = require('./database/redisClient')
const RedisStore = require('connect-redis').default;
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
// app.use(session({
//     store: new RedisStore({ client: redisClient }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     cookie: {
//         maxAge: 864000
//     }
// }))
app.use

app.use("/api/users", userRotes)

app.get('/', (req, res) => {
    res.json({ message: 'server is running' })
})

app.get('/redis-test', async (req, res) => {
    try {
        await redisClient.set('new_value', JSON.stringify({ someKey: 'someValue', name: 'ebenezer', email: 'alaye@gmail.com' }) )
        const value = await redisClient.get('new_value')

        console.log(value, "ALKRWADY EXISTS ")
        if(value){
            console.log("Value already exists: " + value)
            return res.json({ message:  + 'Existinmg before befoe' })
        }
        console.log('i dey new now now')
        res.json({ message: value })
    } catch (err) {
        console.log(err, "THE ERROR HERE")
        res.status(500).json({ error: 'Redis test failed', details: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})

// 3RD PARTTY INTEGRATIONS 

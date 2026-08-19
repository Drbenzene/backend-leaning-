require('dotenv').config();
const express = require('express');
const database = require('./database')

const PORT = process.env.PORT

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    console.log("Welcome home bobo")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
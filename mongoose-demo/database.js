
const mongoose = require('mongoose');
const MONGODB_URI = process.env.DATABASE_URL

console.log(MONGODB_URI, "THE URI OOO")

const dbConnection = async() => {

    try{
       const conn = await mongoose.connect(`${MONGODB_URI}`)
       console.log(`DB CONNECTED SUCCESSFULLY`)
    } catch(err){
        console.log(err, "THE ERRORRR")
        process.exit(1)
    }
}

dbConnection()

module.exports = dbConnection
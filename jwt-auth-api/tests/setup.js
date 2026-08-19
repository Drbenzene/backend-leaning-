const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')

let mongoServer 


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const ueeee = mongoServer.getUri()
    await mongoose.connect(ueeee)
})

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections){
        await collections[key].deleteMany()
    }
})


//Disconnect the test
afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})
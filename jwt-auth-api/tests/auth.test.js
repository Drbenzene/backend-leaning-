const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../server')

let mongoServer

const testUser = {
    userName: "testuser",
    email: "testuser@example.com",
    password: "secret123"
}

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' })
}, 60000)

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe("App Test", () => {
    test("POST /auth/register should create a new user account", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send(testUser)
            .expect(201)

        expect(res.body).toHaveProperty("token")
        expect(res.body.user.email).toBe(testUser.email)
    })

    test("POST /auth/login should return token", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: testUser.email, password: testUser.password })
            .expect(200)

        expect(res.body).toHaveProperty("token")
    })

    test("POST /auth/login with wrong password should be rejected", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: testUser.email, password: "wrongpassword" })
            .expect(401)

        expect(res.body.success).toBe(false)
    })
})

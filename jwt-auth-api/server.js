require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const swaggerUI = require("swagger-ui-express")
const  swaggerJSDoc = require('swagger-jsdoc')

const {connectDB} = require('./database')
const userRoutes = require('./route/userRoutes')
const adminRoutes = require('./route/AdminRoute')
const logger = require('./utils/logger')

const app = express();
const PORT = process.env.PORT || 4000

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ENEGXI INSTITUTE STUDENT LEARNING ",
            description: "NA MEMEMEMEMEE",
            version: '1.0.0'
        }
    },
    servers: [
        {
            url: "http://localhost:4000",
            description: "Local server"
        }
    ],
    apis: ["./route/*.js", "./routes/*.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(express.json());
app.use(morgan('dev'));
app.use('/auth', userRoutes)
app.use('/admin', adminRoutes)

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    req.logger = logger;
    next();
});


async function startServer(){
    try{
        await connectDB()
        app.listen(PORT, ()=> {
            console.log(`server is running on port ${PORT}`)
        })
    } catch (error){
                console.log(error, "THE ERROR")
        console.log(`Failed to start server`)
        process.exit(1)
    }
}

if (process.env.NODE_ENV !== 'test') {
    startServer()
}

module.exports = app

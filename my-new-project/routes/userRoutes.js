const express = require('express')
const router = express.Router()
const {    createUser,getSingleUser, getUsers} = require("../controllers/userController")

router.get('/', getUsers)
router.get("/:id", getSingleUser)
router.post('/sign-up', createUser)

module.exports = router
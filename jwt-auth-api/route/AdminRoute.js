const express = require('express')
const router = express.Router()
console.log("333")

const {adminregister, adminlogin, getAdmin} = require('../controller/adminController')
const {protect, authorize} = require('../middleware/authMiddlware')

console.log("55555555555")

// PUBLIC ENDPOINTS 
router.post('/login', adminlogin)
router.post('/register',  adminregister)

router.get('/me', protect, authorize,  getAdmin)
console.log("66666")


module.exports = router
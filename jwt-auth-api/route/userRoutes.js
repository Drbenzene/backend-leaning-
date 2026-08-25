const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')


console.log("333")

const { register, login, getUser, } = require('../controller/authController')
const { protect, authorize } = require('../middleware/authMiddlware')

console.log("55555555555")

const configureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage: configureStorage,
})


// PUBLIC ENDPOINTS 
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JSON Web Token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 */

router.post('/login', login)


router.post('/register', register)
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' })
    }
    return res.status(200).json({ success: true, message: 'File uploaded successfully' })
})

router.post('/multiple', upload.array('images', 5), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' })
        }
        return res.status(200).json({ success: true, message: 'Files uploaded successfully' })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message })
    }

})




router.get('/me', protect, getUser)

// router.get('/admin', protect, authorize('Admin'), (req, res) => {
//     res.json({
//         success:true,
//         message: 'Welcome padi mi. You be Admin Gugy Cheressss'
//     })
// })

console.log("66666")


module.exports = router



// ALGORITHM
// Given an array of strings, group the strings 
// that are anagrams of each other into sub-arrays. 
// Return the result as an array of arrays. Order of groups/elements does not matter.

// Example 
// Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
// Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
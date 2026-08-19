const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required:true
    },
    age: {
        type: Number,
        require:true,
        min: 10,
        max: 5000
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    createedAt: {
        type: Date,
        default: Date.now
    }
})
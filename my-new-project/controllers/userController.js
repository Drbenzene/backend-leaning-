const prisma = require('../prisma/client');

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        return res.json(users)
    } catch(err){
        res.status(500).json({
            staus:false,
            error: err.message
        })
    }
}


const getSingleUser = async (req, res) => {
    const {id} = req.params

    console.log(id, "THE ID IN PARAMS")
    try {
        const user = await prisma.user.findUnique({
            where: {id: Number(id)}
        })
        if(!user){
            res.status(404).json({
                message: "User no dey ehre"
            })
        }
        return res.json(user)
    } catch(err){
        res.status(500).json({
            staus:false,
            error: err.message
        })
    }
}

const createUser = async (req, res) => {
    const {email, username, phone, password, dob, name } = req.body;
    try {
        const user = await prisma.user.create({
            data:{email, username, phone, password, dob, name }
        })

        return res.status(201).json(user)
    } catch(err){
        res.status(500).json({
            staus:false,
            error: err.message
        })
    }
}

module.exports = {
    createUser,getSingleUser, getUsers
}
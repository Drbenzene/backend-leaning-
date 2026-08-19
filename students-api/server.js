
const http = require('http')

const PORT = 5000

const server = http.createServer((req, res) => {
    if (req.url === '/students' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(students))
    }

    if (req.url === '/students' && req.method === 'POST') {
        let body = "";

        req.on('data', (chunk) => {
            body += chunk.toString()
            console.log(students.length, "THE CURRENT STUDENTS ")

            const newStudent = JSON.parse(body)

            console.log(newStudent, "the studey wey entererrrr")
            newStudent.id = students.length + 1
            students.push(newStudent)
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(newStudent))
        })
    }

    console.log("MEMEMEMEMEMEMMEEMEM")
    console.log(req.url, "THE REQUEST URL OOO")
    if (req.url.startsWith('/students/') && req.method === 'PATCH') {

        console.log("ENTREDDD")
        const parts = req.url.split('/')
        const id = Number(parts[2])
        let body = ""
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            console.log("on edndndnd")
            const studentDateUpdate = JSON.parse(body)
            const index = students.findIndex(student => student.id === id)
            if (index !== -1) {
                students[index] === {
                    ...students[index],
                    ...studentDateUpdate
                }

                res.statusCode = 200
                res.end(JSON.stringify(students[index]))
                return
            } else {
                res.statusCode = 404
                res.end(JSON.stringify({
                    message: `Student with the ID ${id}  does not exist `
                }))
                return
            }
        })
    }

    if (req.url.startsWith('/students/') && req.method === 'DELETE') {
        const parts = req.url.split('/')
        const id = Number(parts[2])
        const index = students.findIndex((student) => student.id === id)

        if (index !== -1) {
            students.splice(index, 1)
            res.statusCode = 200
            res.end(JSON.stringify({
                message: "User Deleted Successlly"
            }))
        } else {
            res.statusCode = 404
            res.end(JSON.stringify({
                message: `Student with the ID ${id}  does not exist `
            }))
            return
        }
    }

})

server.listen(PORT, () => {
    console.log(`i'm on student server ${PORT}`)
})


const students = [
    { id: 1, name: 'Chukwuemeka Obi', email: 'chukwuemeka.obi@school.ng', gender: 'Male', age: 14, class: 'JSS 3', state: 'Anambra' },
    { id: 2, name: 'Ngozi Adeyemi', email: 'ngozi.adeyemi@school.ng', gender: 'Female', age: 15, class: 'JSS 3', state: 'Lagos' },
    { id: 3, name: 'Babatunde Fashola', email: 'babatunde.fashola@school.ng', gender: 'Male', age: 16, class: 'SSS 1', state: 'Lagos' },
    { id: 4, name: 'Amina Bello', email: 'amina.bello@school.ng', gender: 'Female', age: 17, class: 'SSS 2', state: 'Kano' },
    { id: 5, name: 'Emeka Eze', email: 'emeka.eze@school.ng', gender: 'Male', age: 13, class: 'JSS 2', state: 'Enugu' },
    { id: 6, name: 'Fatima Usman', email: 'fatima.usman@school.ng', gender: 'Female', age: 18, class: 'SSS 3', state: 'Kaduna' },
    { id: 7, name: 'Tunde Bakare', email: 'tunde.bakare@school.ng', gender: 'Male', age: 15, class: 'JSS 3', state: 'Ogun' },
    { id: 8, name: 'Chidinma Nwosu', email: 'chidinma.nwosu@school.ng', gender: 'Female', age: 16, class: 'SSS 1', state: 'Imo' },
    { id: 9, name: 'Musa Garba', email: 'musa.garba@school.ng', gender: 'Male', age: 17, class: 'SSS 2', state: 'Sokoto' },
    { id: 10, name: 'Adaeze Okeke', email: 'adaeze.okeke@school.ng', gender: 'Female', age: 14, class: 'JSS 3', state: 'Anambra' },
    { id: 11, name: 'Seun Abiodun', email: 'seun.abiodun@school.ng', gender: 'Male', age: 13, class: 'JSS 2', state: 'Osun' },
    { id: 12, name: 'Halima Yusuf', email: 'halima.yusuf@school.ng', gender: 'Female', age: 18, class: 'SSS 3', state: 'Katsina' },
    { id: 13, name: 'Obinna Igwe', email: 'obinna.igwe@school.ng', gender: 'Male', age: 16, class: 'SSS 1', state: 'Abia' },
    { id: 14, name: 'Blessing Okonkwo', email: 'blessing.okonkwo@school.ng', gender: 'Female', age: 15, class: 'JSS 3', state: 'Delta' },
    { id: 15, name: 'Yusuf Ibrahim', email: 'yusuf.ibrahim@school.ng', gender: 'Male', age: 17, class: 'SSS 2', state: 'Borno' },
    { id: 16, name: 'Kemi Adeleke', email: 'kemi.adeleke@school.ng', gender: 'Female', age: 16, class: 'SSS 1', state: 'Ekiti' },
    { id: 17, name: 'Chidi Nwachukwu', email: 'chidi.nwachukwu@school.ng', gender: 'Male', age: 14, class: 'JSS 3', state: 'Rivers' },
    { id: 18, name: 'Zainab Abdullahi', email: 'zainab.abdullahi@school.ng', gender: 'Female', age: 13, class: 'JSS 2', state: 'Niger' },
    { id: 19, name: 'Rotimi Ogundimu', email: 'rotimi.ogundimu@school.ng', gender: 'Male', age: 18, class: 'SSS 3', state: 'Ondo' },
    { id: 20, name: 'Ifeoma Chukwu', email: 'ifeoma.chukwu@school.ng', gender: 'Female', age: 17, class: 'SSS 2', state: 'Enugu' },
]
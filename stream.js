import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 5000

const server = http.createServer((req, res) => {
    const filepath = path.join(__dirname, './uploads/osbparap.txt')

    const stream = fs.createReadStream(filepath)

    stream.on('error', ()=> {
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end('File Not Found')
    })
    res.writeHead(200, {
        "content-type": 'application/txt'
    })

    stream.pipe(res)
})

server.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
})
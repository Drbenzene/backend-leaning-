import http from 'http'
import os from 'os'

const PORT = 7000

const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type": 'text/plain'})
    const userOs = os.platform()
    console.log(userOs, "THE user os")

    console.log(os.release(), os.hostname(), os.userInfo(), os.uptime(), os.freemem(), os.cpus(), "NEW LOGS")

    res.end('HELLO WORLD')
})

server.listen(PORT, () => {
    console.log('wELCOME MY GUY')
})
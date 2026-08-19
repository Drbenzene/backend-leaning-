const dns = require('dns')
const {MongoClient} = require('mongodb')

// Windows/VPN DNS resolvers sometimes refuse SRV queries intermittently;
// forcing a public resolver avoids sporadic ECONNREFUSED on querySrv.
dns.setServers(['8.8.8.8', '1.1.1.1'])

const url = process.env.DATABASE_URL

const client = new MongoClient(url)

async function connection() {
    try{

        await client.connect()
        console.log('DB CONNECEDT SUCCESSFULLY ')

      const db = client.db('enegxi')
      const stdentCollection = db.collection('students')
 
      const newStudent = await stdentCollection.({
        name: 'Saheed Esupofpo',
        age: 70,
        class: 'SS99',
        email: 'text@test.com',
        phone: '081353635353535'
      })

      console.log('THE NEW STUDENT ID', newStudent.insertedId)


    } catch(err){
        console.log(err, "THE DB CONNECTION ERRORROOO OO")

    } finally{
        await client.close()
    }
}

connection()

module.exports = connection

//
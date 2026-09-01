const {createClient} = require('redis')

const redisClient = createClient({
    url: 'redis://default:tpd0mWV0DJ4KbijHz55J5tbW9iQi8EsH@redis-10278.c239.us-east-1-2.ec2.cloud.redislabs.com:10278'
});
redisClient.on('error', (err) => {
    console.error('I NO DEY CONNETC GUY')
});

redisClient.on('ready', () => {
    console.log("REDIS CONNECTED SUCCESSFULLY")
});

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("Failed to execute connect sequence:", err);
    }
})();

module.exports = redisClient
//

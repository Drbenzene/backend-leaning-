const axios = require('axios')
const BASE_URL = "https://api.paystack.co"
    const headers = {
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json"
    }
async function initializePaymentCollection(email, amount) {
    const finalAmount = Number(amount) * 100
    const url = `${BASE_URL}/transaction/initialize`
    const payload = {
        email: email,
        amount: finalAmount
    }
    const res = await axios.post(url,payload,headers)
    return res
}

async function verifyPayementTransaction(reference) {
    const url = `${BASE_URL}/transaction/verify/${reference}`
    const res = await axios.get(url,headers)
    return res
}
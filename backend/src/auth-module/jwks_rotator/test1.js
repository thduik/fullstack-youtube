// const jose = require("node-jose")
const { returnJWKSkey, returnKeyStore } = require("./rotator")
const { delay } = require("./utils")
// const jwktopem = require('jwk-to-pem')
// const jwt = require('jsonwebtoken')
const { rotateTimerMs } = require("./config")
const { signJwksKey, verifyJwksToken } = require(".")


const correctTest = async () => {
    const payload = {
        exp: Math.floor((Date.now() + 24*60*60*1000) / 1000),
        iat: Math.floor(Date.now() / 1000),
        sub: 'userid12342328',
    }
    try {
        const token = await signJwksKey(payload)
        const res  = await verifyJwksToken(token)
        return token
    } catch(err) {
        console.log("NOT OK failed errorCorrectTest")
        throw(err)
    }
}

const incorrectTest = async (token) => { //delay for rotateTimerMs and verify token 
    try {
        await delay(rotateTimerMs + 300)
        const res  = await verifyJwksToken(token)
        if (res) {console.log("resIs", res); throw(404)}
    } catch (err) {
        if (err==404) {throw('incorrectTest failed')}
        if (err.message) { console.log(err.message.substring(0,100)) }
        else {console.log("incorrectTest err", err)}
        return true
        
    }
}
const main = async () => {
    try {    
    await delay(1000)
    var currToken = null
    for (var i = 0; i < 1000;i++) {
        var random_boolean = Math.random() < 0.5
        if (random_boolean) {
            console.log("conducting correctTest")
            currToken = await correctTest()
        } else {
            if (!currToken) {continue}
            console.log("conducting inCorrectTest")
            const res = await incorrectTest(currToken)
        }
    }
    } catch (err) {
        throw('err', err)
    }
}

main()
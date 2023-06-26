const jose = require("node-jose")
const { returnJWKSkey, returnKeyStore } = require("./rotator")
const { delay } = require("./utils")
const jwktopem = require('jwk-to-pem')
const jwt = require('jsonwebtoken')
const { rotateTimerMs } = require("./config")

const signJwksKey = async ( payload = null ) => {
    try {

    
    if (!payload) { throw ("payload is null bitch")}
    const jkwsPublicKey = returnJWKSkey()
    // console.log("jkwsPublicKey", jkwsPublicKey)
    const keyStore = await jose.JWK.asKeyStore(jkwsPublicKey.toString())
    const [key] = keyStore.all({ use: 'sig' })

    const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } }
  
    const token = await jose.JWS.createSign(opt, key)
        .update(JSON.stringify(payload))
        .final()
    console.log("signJwksKey complete token length is", token.length)
    return token
    } catch (err) {
        throw(err)
    }
}

const verifyJwksToken = async (token) => {
    const data = await returnKeyStore()
    // console.log("verifyJwksToken data is", data)
    const [ firstKey ] = data.keys  
    const publicKey = jwktopem(firstKey)
    try {
        const decoded = jwt.verify(token, publicKey)
        return {success:true, decoded:decoded}
    } catch (e) {
        console.log("verifyJwksToken err", e.message.substring(0,150))
        throw(e)
    }
}

module.exports = {signJwksKey, verifyJwksToken}
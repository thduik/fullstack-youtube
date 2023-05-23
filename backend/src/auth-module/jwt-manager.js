const { generateRandomString } = require("../utils/strings/generateRandomString")
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const refreshTokenLength = process.env.GOOGLE_REFRESH_TOKEN_LENGTH 

//keys generated for rsa
const public_key = fs.readFileSync(path.resolve(__dirname, '../jwt-keys/public.pem'));
const private_key = fs.readFileSync(path.resolve(__dirname, '../jwt-keys/private.pem'));

//caching used to store refreshTokenz in memory
//{"user123456":"refreshToken123456"}
const idToRefreshTokenMap = new Map()

const createRefreshToken = () => {
    return generateRandomString(refreshTokenLength)
}

const createAccessTokenJWT = (userid) => {
    //numeric date is seconds elapsed since epoch time 1970-01-01T00:00:00Z
    const jwtNumericDate = Math.floor(Date.now()/1000) 
    const jwtSecret = process.env.JWT_PRIVATE_KEY_OPENID
    const jwtId = generateRandomString(27)
    //jwtId is optional and experimental feature
    console.log("JWT_PRIVATE_KEY", private_key)
    const jwtBody = { 
        sub:userid,
        iat:jwtNumericDate,
        aud:'https://holysheet2831.hopto.org/api',
        jit:jwtId,
        exp:jwtNumericDate + 60*20 //20 minutes converted to seconds
     }

    var token = jwt.sign(jwtBody, private_key, { algorithm: 'RS256' });
    return token
}

const verifyJwtAccessToken = (accessToken) => {
    try {
        const res = jwt.verify(accessToken, public_key, { algorithm: 'RS256'})
        return res
    } catch (err) {
        throw("verifyJwtAccessToken error:", err)
    }
    // await jwt.verify(accessToken, public_key, { algorithm: 'RS256'}, function(err, decoded) {
    //     if (err) {
    //         throw("verifyJwtAccessToken error:", err)
    //     }
    //     console.log("verifyJwtAccessToken success", decoded)
    //     return decoded
    //   });
}

const createRefreshAndAccessToken = (userid) => {
    //accessToken is JWT, refreshToken is stateful
    const refreshToken = createRefreshToken()
    idToRefreshTokenMap.set(userid, refreshToken)
    const accessToken = createAccessTokenJWT(userid)
    return {refreshToken:refreshToken, accessToken:accessToken}
}

const deleteRefreshTokenOfUser = (userid) => {
    idToRefreshTokenMap.delete(userid)
}
module.exports = {createRefreshAndAccessToken, deleteRefreshTokenOfUser, verifyJwtAccessToken}
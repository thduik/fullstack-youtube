const { generateRandomString } = require("../utils/strings/generateRandomString")
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { setCookiesAndSendResPostLogin, setCookiesAfterRefreshAccessToken } = require("./utils-cookies")

require('dotenv').config()

const refreshTokenLength = process.env.GOOGLE_REFRESH_TOKEN_LENGTH 

//keys generated for rsa
const public_key = fs.readFileSync(path.resolve(__dirname, '../jwt-keys/public.pem'));
const private_key = fs.readFileSync(path.resolve(__dirname, '../jwt-keys/private.pem'));

//caching used to store refreshTokenz in memory
//{"user123456":"refreshToken123456"}
const idToRefreshTokenMap = new Map()
const refreshTokenToIdMap = new Map()

const createRefreshToken = () => {
    return generateRandomString(refreshTokenLength)
}

const createAccessTokenJWT = (userid) => {
    //numeric date is seconds elapsed since epoch time 1970-01-01T00:00:00Z
    const jwtNumericDate = Math.floor(Date.now()/1000) 
    const jwtSecret = process.env.JWT_PRIVATE_KEY_OPENID
    const jwtId = generateRandomString(27)
    //jwtId is optional and experimental feature
    const jwtBody = { 
        sub:userid,
        iat:jwtNumericDate,
        aud:'https://holysheet2831.hopto.org/api',
        jit:jwtId,
        exp:jwtNumericDate + 1200 //20 minutes converted to seconds
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
}

const createRefreshAndAccessToken = (userid) => {
    //accessToken is JWT, refreshToken is stateful
    const refreshToken = createRefreshToken()
    console.log("newRefreshToken is", refreshToken)
    idToRefreshTokenMap.set(userid, refreshToken)
    refreshTokenToIdMap.set(refreshToken, userid)
    const accessToken = createAccessTokenJWT(userid)
    // console.log("createRefreshAndAccessToken complete",refreshToken.length, accessToken.length )
    return {refreshToken:refreshToken, accessToken:accessToken}
}

const verifyRefreshTokenAndCreateAccessToken = (refreshToken) => {
    const useridRes = refreshTokenToIdMap.get(refreshToken)
    if (!useridRes) {
        throw(" error refreshTokenToIdMap.get(refreshToken) failed")
    }
    //delete old stuff as best practice
    refreshTokenToIdMap.delete(refreshToken)
    idToRefreshTokenMap.delete(useridRes)
    //create new refreshToken+AccessToken and return them
    // console.log("verifyRefreshTokenAndCreateAccessToken succcess useridRes", useridRes)
    const resultes = createRefreshAndAccessToken(useridRes)
    return resultes

}   

const verifyRefreshTokenAndGetNewAccessTokenRequest = (req,res,next) => {
    // console.log("verifyRefreshTokenAndGetNewAccessTokenRequest req.cookies:", req.cookies)
    console.log("verifyRefreshToken refreshToken is", req.cookies.refreshToken.substring(0,10))
    try {
        const {accessToken, refreshToken} = verifyRefreshTokenAndCreateAccessToken(req.cookies.refreshToken)
        setCookiesAfterRefreshAccessToken(accessToken, refreshToken, res)
        const resultos = verifyJwtAccessToken(accessToken)
        req.auth.userid = resultos.sub
        setCookiesAfterRefreshAccessToken(accessToken, refreshToken, res)
        next()
    } catch(err) {
        console.log("refreshToken failed", err, refreshTokenToIdMap )
        // res.status(401).send("bad error happened, please log in again")
        next()
    }
}

const deleteRefreshTokenOfUser = (userid) => {
    idToRefreshTokenMap.delete(userid)
}
module.exports = {createRefreshAndAccessToken, deleteRefreshTokenOfUser, verifyJwtAccessToken
,verifyRefreshTokenAndGetNewAccessTokenRequest}
const {verifyJwtAccessToken, verifyRefreshTokenAndGetNewAccessTokenRequest} = require('./jwt-manager')
const {deleteRefreshAccessTokenCookies} = require('./utils-cookies')

const verifyJwtAccessTokenRequest = (req,res,next) => {
    if (!req.cookies.accessToken) {
        if (req.cookies.requestToken) {
            console.log("log this requestTOken should not be here")
            return res.status(401).send("error why u hacker")
            
        }
        console.log("verifyJwtAccessTokenRequest no cookies", next)
        next()
        return
    }

    try {
        const resultos = verifyJwtAccessToken(req.cookies.accessToken)
        req.auth.userid = resultos.sub
        next()
    } catch (err) {
        verifyRefreshTokenAndGetNewAccessTokenRequest(req,res,next)
        return
    }

}

const logoutApp = (req,res) => {
    console.log("logoutApp called")
    deleteRefreshAccessTokenCookies(req,res)
}
module.exports = {verifyJwtAccessTokenRequest, logoutApp}
const { verifyJwtAccessToken, verifyRefreshTokenAndGetNewAccessTokenRequest } = require('./jwt-manager')
const { deleteRefreshAccessTokenCookies } = require('./utils-cookies')

const verifyJwtAccessTokenRequest = (req, res, next) => {
    console.log("verifyJwtAccessTokenRequest called")
    if (req.cookies.refreshToken) {
        if (req.cookies.accessToken) {
            return verifyAccessTokenFlow(req, res, next)
        }
        return verifyRefreshTokenAndGetNewAccessTokenRequest(req, res, next)
    }

    if (req.cookies.accessToken) {
        returnres.status(401).send("error HACKER BITH")
    }

    next()

}

const verifyAccessTokenFlow = (req, res, next) => {
    try {
        const resultos = verifyJwtAccessToken(req.cookies.accessToken)
        req.auth.userid = resultos.sub
        console.log("verifyJwtAccessTokenRequest success", req.auth)
        next()
    } catch (err) {
        verifyRefreshTokenAndGetNewAccessTokenRequest(req, res, next)
        return
    }
}

const logoutApp = (req, res) => {
    console.log("logoutApp called")
    deleteRefreshAccessTokenCookies(req, res)
}
module.exports = { verifyJwtAccessTokenRequest, logoutApp }
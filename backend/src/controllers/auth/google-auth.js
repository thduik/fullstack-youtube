const { googleCheckCredentialsAndCreateTokens } = require("../../auth-module/auth-manager")
const {setCookiesAndSendResPostLogin} = require('./utils.js')

const googleLogin = async (req,res) => {
   
    if (!req.body.googleToken) {
        console.log("googleLogin controller failed no token")
        res.send("error no token")
        return
    }
    console.log("googleLogin controller called", req.body.googleToken)
    const googleToken =  req.body.googleToken
    try {
        const resultos = await googleCheckCredentialsAndCreateTokens(googleToken)
        console.log("googleLogin controller success", resultos)
        //{userData:userData, accessToken:accessToken (jwt form), refreshToken:refreshToken}
        //user is also created in DB and cache if new user
        setCookiesAndSendResPostLogin(accessToken, refreshToken, res)
        res.send("successfully got refresh and access tokenis")
    } catch (err) {
        console.log("googleLogin error", err)
        res.send("sorry we have error with this action BITCHHH")
    }
    
}



module.exports = { googleLogin}
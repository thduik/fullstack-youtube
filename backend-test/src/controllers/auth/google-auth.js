const { googleCheckCredentialsAndCreateTokens } = require("../../auth-module/auth-manager")

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
        setCookiesPostLogin(accessToken, refreshToken, res)
        res.send("successfully got refresh and access tokenis")
    } catch (err) {
        console.log("googleLogin error", err)
        res.send("sorry we have error with this action BITCHHH")
    }
    
}

const setCookiesPostLogin = (accessToken, refreshToken, res) => {
    res.cookie("accessToken", accessToken, {
        secure:true,
        httpOnly:true,
        expires:Date.now()+20*60*1000 // 20 minutes
    })
    res.cookie("refreshToken", {
        secure:true,
        httpOnly:true,
        expires:Date.now()+ 24*60*60*1000 // 1 day = 24h * 60m * 60s * 1000 milisec
    })
    
}

module.exports = { googleLogin}
/*
*Result = result from googleCheckCredentialsAndCreateTokens
*/


const setCookiesAndSendResPostLogin = (result ,res) => {

    res.cookie("accessToken", result.accessToken, {
        secure:true,
        httpOnly:true,
        maxAge:20*60*1000
        // expire:Date.now()+20*60*1000 // 20 minutes
    })
    res.cookie("refreshToken",result.refreshToken, {
        secure:true,
        httpOnly:true,
        maxAge:Date.now()+ 24*60*60*1000 // 1 day = 24h * 60m * 60s * 1000 milisec
    })
    const userData = result.userData
    res.json({
        userId:userData.userid,
        googleid:userData.googleid,
        name:userData.name,
        userName: userData.username,
        email: userData.email,
        pictureUrl: userData.pictureurl
    })
}

module.exports = {setCookiesAndSendResPostLogin}
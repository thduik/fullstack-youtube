const setCookiesAfterRefreshAccessToken = (accessToken, refreshToken,res) => {
    res.cookie("accessToken", accessToken, {
        secure:true,
        httpOnly:true,
        maxAge:20*60*1000
        // expire:Date.now()+20*60*1000 // 20 minutes
    })
    res.cookie("refreshToken", refreshToken, {
        secure:true,
        httpOnly:true,
        maxAge:Date.now()+ 24*60*60*1000 // 1 day = 24h * 60m * 60s * 1000 milisec
    })
}

const deleteRefreshAccessTokenCookies = (req, res) => { 
    //req = express req object in req, res, next
    res.cookie('accessToken','none', {maxAge: 0});
    res.cookie('refreshToken','none', {maxAge: 0});
    res.status(200).json({success:1})
}

const setCookiesAndSendResPostLogin = (result, res) => {
    // console.log("setCookiesAndSendResPostLogin", res.cookie)
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
}

module.exports = {setCookiesAndSendResPostLogin, setCookiesAfterRefreshAccessToken, deleteRefreshAccessTokenCookies}
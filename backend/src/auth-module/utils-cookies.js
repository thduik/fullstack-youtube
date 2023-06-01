
const setCookiesAfterRefreshAccessToken = (accessToken, refreshToken,res) => {
    console.log("setCookiesAfterRefreshAccessToken refreshToken"
    , refreshToken.substring(0,10), "accessToken", accessToken.substring(0,10))

    res.cookie("accessToken", accessToken, {
        secure:true,
        httpOnly:true,
        maxAge:20*60*1000
        // expire:Date.now()+20*60*1000 // 20 minutes
    })
    res.cookie("refreshToken", refreshToken, {
        secure:true,
        httpOnly:true,
        maxAge:24*60*60*1000 // 1 day = 24h * 60m * 60s * 1000 milisec
    })
}

const deleteRefreshAccessTokenCookies = (req, res) => { 
    //req = express req object in req, res, next
    res.cookie('accessToken','none', {maxAge: 0});
    res.cookie('refreshToken','none', {maxAge: 0});
    res.status(200).json({success:1})
}

const setCookiesAndSendResPostLogin = (result, res) => {
    console.log("setCookiesAndSendResPostLogin", result.refreshToken.substring(0,10))
    res.cookie("accessToken", result.accessToken, {
        secure:true,
        httpOnly:true,
        maxAge: 20*60*1000
        // expire:Date.now()+20*60*1000 // 20 minutes
    })
    res.cookie("refreshToken",result.refreshToken, {
        secure:true,
        httpOnly:true,
        maxAge:7*24*60*60*1000 // 7 days = 7 * 1 day = 7 * 24h * 60m * 60s * 1000 milisec
    })
}

module.exports = {setCookiesAndSendResPostLogin, setCookiesAfterRefreshAccessToken, deleteRefreshAccessTokenCookies}
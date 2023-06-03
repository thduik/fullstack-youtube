const { getUserFromCacheOrDb } = require("../../db")
const { converUserDataToJson } = require("../utils")

//routes/auth-router.js
const cookieLogin = async (req,res,next) => {
    
    console.log("cookieLogin called, req.auth is", req.auth, "refreshToken:", req.cookies.refreshToken && req.cookies.refreshToken.substring(0,10))
    if (!req.auth.userid) {
        // console.log("no cookies found")
        res.status(401).send("no user found bitch")
        return
    }
    try {
        const userDataDb = await getUserFromCacheOrDb(req.auth.userid)
        res.json(converUserDataToJson(userDataDb))
    } catch (err) {
        // console.log("cookieLogin failed", err)
        res.status(401).send("no user found bitch")
    }
}

module.exports = {cookieLogin}
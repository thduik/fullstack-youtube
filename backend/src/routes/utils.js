const authUserOnly = (req,res,next) => {
    if (!req.auth.userid) {
        // console.log("authUserOnly failed")
        res.send("authorization failed bitch")
        return
    }
    next()
}

module.exports = {authUserOnly}
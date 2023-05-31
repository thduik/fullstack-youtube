const authUserOnly = (req,res,next) => {
    if (!req.auth.userid) {
        console.log("authUserOnly failed")
        return
    }
    next()
}

module.exports = {authUserOnly}
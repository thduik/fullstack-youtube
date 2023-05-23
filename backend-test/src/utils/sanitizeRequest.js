const sanitizeRequest = (req,res,next) => {
    req.auth = {}
    next()
}

module.exports = {sanitizeRequest}
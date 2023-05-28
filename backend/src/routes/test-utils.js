const testVerifyAuthId = (req,res,next) => {
    const playlistData = req.body.playlistData
    console.log("testVerifyAuthId", req.body.playlistData.userid, req.auth.userid)
    if (req.body.playlistData.userid == req.auth.userid) {
        next()
        return
    }

    res.status(402).send("id verify failed")

    
}

module.exports = {testVerifyAuthId}
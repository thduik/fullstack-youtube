const testVerifyAuthId = (req,res,next) => {
    const playlistData = req.body.playlistData
    console.log("testVerifyAuthId", req.body.playlistData.userid, req.auth.userid)
    if (req.body.playlistData.userid == res.auth.userid) {
        next()
        return
    }

    res.send("id verify failed")

    
}

module.exports = {testVerifyAuthId}
const { createPlaylistDb, getAllPlaylistsOfUser } = require("../db/playlist-db")

const createPlaylist = async (req,res,next) => {
    const playlist = req.body.playlist
    const videoInfo = req.body.videoInfo
    console.log("createPlaylist")
    try {
        const docID = await createPlaylistDb(playlist, videoInfo)
        res.json({docid:docID, success:true})
    } catch (err) {
        console.log("err createPlaylist", err)
        res.status(402).send("error creatingPlaylist")
    }
    
}

const getPlaylistsOfUser = async (req,res,next) => {
    const userid = req.auth.userid
    try {
        const playlistsDocs = await getAllPlaylistsOfUser(userid)
        res.json({playlists:playlistsDocs, success:true})
    } catch (err) {
        console.log("error getPlaylistsOfUser", err)
        res.status(402).send("error gettingPlaylist")
    }
    
}

const getVideosListOfPlaylist = async (req,res,next) => {

}
module.exports = {createPlaylist, getPlaylistsOfUser}
const { getPlaylistsOfUserDataM, getVideosListOfPlaylistDataM, createPlaylistDataM
    , addVideoToPlaylistsDataM, getPlaylistDetailDataM, deleteVideoFromPlaylistDataM } = require("../../data-manager")
const { deleteVideoFromPlaylistDb } = require("../../db/playlist-db")
// const { postProcessDocArr } = require('./utils')

const createPlaylist = async (req, res, next) => {
    const playlist = req.body.playlist //{videoId:string,videoName:string,thumbnailUrl:string,createdAt:int}
    const videoInfo = req.body.videoInfo //{playlistName:string, userid:string, isPrivate:bool,isUnlisted:bool }

    try {
        const doc = await createPlaylistDataM({ playlist: playlist, videoInfo: videoInfo })
        console.log("createPlaylistDataM success doc._id", doc)
        doc._id = doc._id.toString()

        res.json({ doc: doc, success: true })

    } catch (err) {
        console.log("err createPlaylist", err)
        res.status(402).send("error creatingPlaylist")
    }

}

const getPlaylistsOfUser = async (req, res, next) => {
    const userid = req.auth.userid
    // console.log("getPlaylistsOfUserController userid ", userid)
    try {
        const playlistsDocs = await getPlaylistsOfUserDataM(userid)
        // postProcessDocArr(playlistsDocs)
        console.log("getPlaylistsOfUserController success", playlistsDocs)
        res.json({ playlists: playlistsDocs, success: true })
    } catch (err) {
        console.log("error getPlaylistsOfUser", err)
        res.status(402).send("error gettingPlaylist")
    }
}


const getVideosListOfPlaylist = async (req, res, next) => {


    const playlistid = req.params.playlistid //string

    try {
        const videoDocs = await getVideosListOfPlaylistDataM(playlistid)
        console.log("getVideosListOfPlaylistController success", "p-id", playlistid, "videoDocs.length", videoDocs.length)
        res.json({ videos: videoDocs })
    } catch (err) {
        console.log("getVideosListOfPlaylistController err", err)
    }

}

const addVideoToPlaylist = async (req, res, next) => {
    const playlistIdArr = req.body.playlistIdArr //[string] array of playlist id
    const videoLol = req.body.videoData // {videoId:string, videoName:string, thumbnailUrl:string, createdAt:string}
    // console.log("addVideoToPlaylist playlistIdArr",playlistIdArr,"videoLol",videoLol)

    try {

        const addRes = await addVideoToPlaylistsDataM(playlistIdArr, videoLol)
        res.json({ success: true })
    } catch (err) {
        console.log("addVideoToPlaylist controller err", err)
    }

}


const getPlaylistDetail = async (req, res, next) => {
    const playlistId = req.params.playlistid //string
    try {

        const result = await getPlaylistDetailDataM(playlistId)
        console.log("getPlaylistDetail controller success", result)
        res.send({ playlist: result })
    } catch (err) {
        console.log("getPlaylistDetail err", err)
        res.send("Error getting playlist detail")
    }

}

const deleteVideoFromPlaylist = async (req, res, next) => {
    console.log("deleteVideoFromPlaylist called")
    try {
        const { videoData, playlistId } = req.body
        const { userid } = req.auth; if (!userid) { throw ("no user id") }
        const result = await deleteVideoFromPlaylistDataM({ videoData: videoData, playlistId: playlistId, userId: userid })
        console.log("deleteVideoFromPlaylist result:", result)
        res.send({success:1})

    } catch (err) {
        console.log("err deleteVideoFromPlaylist")
        res.send({success:0})
    }
}

module.exports = {
    deleteVideoFromPlaylist, createPlaylist, getPlaylistsOfUser, getVideosListOfPlaylist, addVideoToPlaylist, getPlaylistDetail
    , deleteVideoFromPlaylist
}
const { getPlaylistsOfUserDataM, getVideosListOfPlaylistDataM, createPlaylistDataM
,addVideoToPlaylistsDataM } = require("../../data-manager")
const { createPlaylistDb, getAllPlaylistsOfUser, getAllVideosOfPlaylist,
    addVideoToPlaylistsConcurrentDb, deleteVideoFromPlaylistDb } = require("../../db/playlist-db")
const { postProcessDocArr } = require('./utils')

const createPlaylist = async (req, res, next) => {
    const playlist = req.body.playlist //{videoId:string,videoName:string,thumbnailUrl:string,createdAt:int}
    const videoInfo = req.body.videoInfo //{playlistName:string, userid:string, isPrivate:bool,isUnlisted:bool }

    try {
        const doc = await createPlaylistDataM(playlist, videoInfo)
        doc._id = doc._id.toString()
        console.log("createPlaylistDataM success doc._id", doc._id)
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
        console.log("getPlaylistsOfUserController success", playlistsDocs[0].thumbnailUrl)
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
        console.log("getVideosListOfPlaylistController success", "p-id",playlistid, "videoDocs.length", videoDocs.length)
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

const deleteVideoFromPlaylist = async (req, res, next) => {
    const video = req.body.video
    const videoOrderIndex = req.body.videoOrderIndex
    console.log("deleteVideoFromPlaylist video:", video)

    try {
        const result = await deleteVideoFromPlaylistDb(video, videoOrderIndex)
        res.json({ success: true })
    } catch (err) {
        console.log("deleteVideoFromPlaylist err", err)
        res.status(402).json({ success: false })
    }
}


module.exports = { deleteVideoFromPlaylist, createPlaylist, getPlaylistsOfUser, getVideosListOfPlaylist, addVideoToPlaylist }
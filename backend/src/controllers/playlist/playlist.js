const { createPlaylistDb, getAllPlaylistsOfUser, getAllVideosOfPlaylist, 
    addVideoToPlaylistsConcurrentDb, deleteVideoFromPlaylistDb } = require("../../db/playlist-db")
const {postProcessDocArr} = require('./utils')

const createPlaylist = async (req,res,next) => {
    console.log("createPlaylist called", req.auth.userid)
    const playlist = req.body.playlist
    const videoInfo = req.body.videoInfo
    try {
        const doc = await createPlaylistDb(playlist, videoInfo)
        res.json({doc:doc, success:true})

    } catch (err) {
        console.log("err createPlaylist", err)
        res.status(402).send("error creatingPlaylist")
    }
    
}

const getPlaylistsOfUser = async (req,res,next) => {
    // console.log("getPlaylistsOfUser req.auth is", req.auth)
    const userid = req.auth.userid
    try {
        const playlistsDocs = await getAllPlaylistsOfUser(userid)
        postProcessDocArr(playlistsDocs)
        res.json({playlists:playlistsDocs, success:true})
    } catch (err) {
        console.log("error getPlaylistsOfUser", err)
        res.status(402).send("error gettingPlaylist")
    }
    
}

const getVideosListOfPlaylist = async (req,res,next) => {
    const playlistid = req.params.playlistid
    try {
        const videoDocs = await getAllVideosOfPlaylist(playlistid)
        postProcessDocArr(videoDocs)
        // console.log("getVideosListOfPlaylist success", videoDocs)
        res.json({videos:videoDocs})
    } catch (err) {
        // console.log("getVideosListOfPlaylist", err)
        res.status(402).send("error getVideosListOfPlaylist")
    }
}

const addVideoToPlaylist = async (req,res,next) => {
    const playlistIdArr = req.body.playlistIdArr
    const videoLol = req.body.videoData
    try {
        const addRes = await addVideoToPlaylistsConcurrentDb(playlistIdArr, videoLol)
        
        res.json({success:true})
    } catch (err) {
        console.log("addVideoToPlaylist controller err", err)
    }
    
}

const deleteVideoFromPlaylist = async (req,res,next) => {
    const playlistid = req.params.playlistid
    const video = req.body.video
    const playlistData = req.body.playlistData
    const videoOrderIndex = req.body.videoOrderIndex
    console.log("deleteVideoFromPlaylist video:", video)
    try {
        const result = await deleteVideoFromPlaylistDb(video, videoOrderIndex)
        res.json({success:true})
    } catch(err) {
        console.log("deleteVideoFromPlaylist err", err)
        res.status(402).json({success:false})
    }
}


module.exports = {deleteVideoFromPlaylist, createPlaylist, getPlaylistsOfUser, getVideosListOfPlaylist, addVideoToPlaylist}
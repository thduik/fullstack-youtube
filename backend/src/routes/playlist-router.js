const expresso = require('express');
const { createPlaylist, getPlaylistsOfUser, getVideosListOfPlaylist, addVideoToPlaylist, deleteVideoFromPlaylist } = require('../controllers/playlist/playlist');
const { mockUserId } = require('../tests/data');
const playlistRouter = expresso.Router();
const {testVerifyAuthId} = require('./test-utils.js')


//full path is /playlist/create

playlistRouter.post("/playlist/create", async (req,res,next)=>{
    console.log("testRouter /playlist/create POST received", req.body)
    createPlaylist(req,res,next)

    //
})

testRouter.post("/playlist/update/:playlistid", testVerifyAuthId, (req,res,next)=>{
    //this is meant to add new video to certain playlist
    const playlistid = req.params.playlistid
    const video = req.body.video
    const playlistData = req.body.playlistData
    console.log("testRouter /playlist/update POST received", playlistData)

    addVideoToPlaylist(req,res,next)
    //
})

testRouter.post("/playlist/:playlistid/videos/delete", testVerifyAuthId,  (req,res,next)=>{
    //this is meant to add new video to certain playlist
    console.log("testRouter /playlist/:playlistid/videos/delete POST received", req.body)
    const playlistid = req.params.playlistid
    const video = req.body.video
    const playlistData = req.body.playlistData
    const videoOrderIndex = req.body.videoOrderIndex
    deleteVideoFromPlaylist(req,res,next)
    //
})

testRouter.get("/playlist/:playlistid/videos", getVideosListOfPlaylist)

testRouter.get("/playlist", async (req,res,next)=>{

    console.log("testRouter GET res.cookies are:", req.cookies)
    
    return getPlaylistsOfUser(req,res,next)
    
})
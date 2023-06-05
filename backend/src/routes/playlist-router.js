const expresso = require('express');
const { createPlaylist, getPlaylistsOfUser, getVideosListOfPlaylist, addVideoToPlaylist, deleteVideoFromPlaylist } = require('../controllers/playlist/playlist');
const { mockUserId } = require('../tests/data');
const playlistRouter = expresso.Router();
const {testVerifyAuthId} = require('./test-utils.js');
const { authUserOnly } = require('./utils');


//base path is /playlist

playlistRouter.get("/", getPlaylistsOfUser)

playlistRouter.post("/",authUserOnly)

playlistRouter.post("/create", createPlaylist)
//const playlistid = req.params.playlistid
playlistRouter.post("/update/", addVideoToPlaylist)



// testRouter.get("/playlist/:playlistid/videos", getVideosListOfPlaylist)


module.exports = {playlistRouter}

// testRouter.post("/playlist/:playlistid/videos/delete",  (req,res,next)=>{
//     //this is meant to add new video to certain playlist
//     console.log("testRouter /playlist/:playlistid/videos/delete POST received", req.body)
//     const playlistid = req.params.playlistid
//     const video = req.body.video
//     const playlistData = req.body.playlistData
//     const videoOrderIndex = req.body.videoOrderIndex
//     deleteVideoFromPlaylist(req,res,next)
//     //
// })

// testRouter.get("/playlist/:playlistid/videos", getVideosListOfPlaylist)

// testRouter.get("/playlist", async (req,res,next)=>{
//     console.log("testRouter GET res.cookies are:", req.cookies)
//     return getPlaylistsOfUser(req,res,next)
// })


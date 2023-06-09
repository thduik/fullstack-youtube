const expresso = require('express');
const { setCookiesAndSendResPostLogin } = require('../controllers/auth/utils');
const { createPlaylist, getPlaylistsOfUser, getVideosListOfPlaylist, addVideoToPlaylist, deleteVideoFromPlaylist } = require('../controllers/playlist/playlist');
const { testUserArr } = require('../tests/playlist/data');
const testRouter = expresso.Router();
const {testVerifyAuthId} = require('./test-utils.js')


//full path is /auth/google/login

testRouter.use('/', (req,res,next)=>{
    console.log("testRouter GET called")
    req.auth.userid = testUserArr[0].userid
    next()
})

testRouter.get("/playlist", getPlaylistsOfUser)


testRouter.post("/playlist/create", createPlaylist)
//const playlistid = req.params.playlistid
testRouter.post("/playlist/update", addVideoToPlaylist)



// testRouter.post("/playlist/create", async (req,res,next)=>{
//     console.log("testRouter /playlist/create POST received", req.body)
//     createPlaylist(req,res,next)

//     //
// })

// testRouter.post("/playlist/update/:playlistid", testVerifyAuthId, (req,res,next)=>{
//     //this is meant to add new video to certain playlist
//     const playlistid = req.params.playlistid
//     const video = req.body.video
//     const playlistData = req.body.playlistData
//     console.log("testRouter /playlist/update POST received", playlistData)

//     addVideoToPlaylist(req,res,next)
//     //
// })

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


/*
*Cookie testing needs to be done from browser
*/


// testRouter.post("/cookies", (req,res,next)=>{

//     console.log("testRouter POST res.cookies are:", req.cookies)
//     const result = {userData:mockUserData, accessToken:"testAccessToken", refreshToken:"testrefreshToken"}
//     setCookiesAndSendResPostLogin(result, res)
// })

// testRouter.get("/cookies", (req,res,next)=>{
//     console.log("testRouter GET res.cookies are:", req.cookies)
// })


module.exports = {testRouter}
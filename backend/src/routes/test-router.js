const expresso = require('express');
const { setCookiesAndSendResPostLogin } = require('../controllers/auth/utils');
const { createPlaylist, getPlaylistsOfUser } = require('../controllers/playlist');
const { mockUserId } = require('../tests/data');
const testRouter = expresso.Router();



//full path is /auth/google/login

testRouter.post("/playlist/create", async (req,res,next)=>{
    console.log("testRouter /playlist/create POST received", req.body)
    await createPlaylist(req,res,next)

    //
})

testRouter.post("/playlist/update", (req,res,next)=>{
    console.log("testRouter /playlist/update POST received")
    const playlist = req.body.playlist
    //
})

testRouter.get("/playlist", async (req,res,next)=>{
    console.log("testRouter GET res.cookies are:", req.cookies)
    req.auth.userid = mockUserId
    await getPlaylistsOfUser(req,res,next)
    
     
})


/*
*Cookie testing needs to be done from browser
*/

// const mockUserData = {
//     userid:'mockUserId',
//     googleid: 'mockGoogleId',
//     email: 'mockEmail',
//     verifiedemail: true,
//     name: 'John Doe',
//     givenname: 'John',
//     familyname: 'Doe',
//     picture: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960",
//     locale: 'en'
// }

// testRouter.post("/cookies", (req,res,next)=>{

//     console.log("testRouter POST res.cookies are:", req.cookies)
//     const result = {userData:mockUserData, accessToken:"testAccessToken", refreshToken:"testrefreshToken"}
//     setCookiesAndSendResPostLogin(result, res)
// })

// testRouter.get("/cookies", (req,res,next)=>{
//     console.log("testRouter GET res.cookies are:", req.cookies)
// })


module.exports = {testRouter}
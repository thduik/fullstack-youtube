//testing playlist crud functions, assuming correct identity and skipping identity checks
//order is create update delete
//because crud lies at the end of req/res handling, can directly test with api requests
//to /test/playlist endpoint 

const Playlist = require('../../models/Playlist')
const PlaylistVideoInfo = require('../../models/PlaylistVideoInfo')
const axios = require('axios')
const { mockUserId, mockPlaylistName } = require('../data')
const connectDB = require('../../db/connect-db')
const request = require("supertest")
const {  setupTest, cleanupTest,
    testCreatePlaylist, testGetPlaylist, testGetVideosOfPlaylist,
    testAddVideoToPlaylist, testDeleteVideoFromPlaylist } = require('./playlist-functions')

const baseUrl = 'http://localhost:4444/test'

const assert = require('assert/strict');
const test = require('node:test')
const {  videoDataArr, testVideoArr, testPlaylistArr, testUserArr } = require('./data')
const { stage1Test,stage2Test, stage3Test, stage4Test } = require('./test-cases')
const { resolve } = require('path')



const playlistArrayClientSide = []
//{playlist._id:[video]}
const playlistToVideoMapClientSide = new Map()

const delay = (ms) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(()=>{console.log("delayedCalled", ms, "ms")});
    }, ms);
  });

const testLol = async () => {

    try {
        await setupTest()
        await cleanupTest()
        
        //the 0th video of playlist 0 and and 0th video of playlist 1 created
        const postRes = await testCreatePlaylist(testUserArr[0].username, testPlaylistArr[0][0], testVideoArr[0][0][0])
        const postRes1 = await testCreatePlaylist(testUserArr[0].username, testPlaylistArr[0][1], testVideoArr[0][1][0])
        const playlistArrRes = await testGetPlaylist()
        //array pf playlist object json keys are {_id,playlistName,userid,videoId,thumbnailUrl}
        const videoArrayRes0 = await testGetVideosOfPlaylist(playlistArrRes[0])
        const videoArrayRes1 = await testGetVideosOfPlaylist(playlistArrRes[1])

        //testing cache
        const videoArrayRes01 = await testGetVideosOfPlaylist(playlistArrRes[0])
        const videoArrayRes12 = await testGetVideosOfPlaylist(playlistArrRes[1])
        const videoArrayRes001 = await testGetVideosOfPlaylist(playlistArrRes[0])
        const videoArrayRes012 = await testGetVideosOfPlaylist(playlistArrRes[1])
        //array of video obj json keys are {_id, playlistId,videoName}
        // await stage1Test(videoArrayRes01, videoArrayRes1)
        // await stage1Test(videoArrayRes01, videoArrayRes12)
        // await stage1Test(videoArrayRes001, videoArrayRes012)

        
        
        //add function
        
        const r1 = await testAddVideoToPlaylist([playlistArrRes[0]], testVideoArr[0][0][1])
        await delay(500)
        const r2 = await testAddVideoToPlaylist([playlistArrRes[1]], testVideoArr[0][1][1])
        await delay(500)
        const r3 = await testAddVideoToPlaylist([playlistArrRes[0], playlistArrRes[1]], testVideoArr[0][0][2])

        
        const videoArrayRes11 = await testGetVideosOfPlaylist(playlistArrRes[0])
        await delay(500)
        const videoArrayRes22 = await testGetVideosOfPlaylist(playlistArrRes[1])  
        await delay(500)
        const videoArrayRes0011 = await testGetVideosOfPlaylist(playlistArrRes[0]) 
        await delay(500)
        const videoArrayRes0022 = await testGetVideosOfPlaylist(playlistArrRes[1])   

        videoArrayRes11.sort((a,b)=>a.createdAt - b.createdAt)
        videoArrayRes22.sort((a,b)=>a.createdAt - b.createdAt)
        videoArrayRes0011.sort((a,b)=>a.createdAt - b.createdAt)
        videoArrayRes0022.sort((a,b)=>a.createdAt - b.createdAt)

        test('video array length == 3', () => {
            return assert.strictEqual(videoArrayRes11.length == 3 && videoArrayRes22.length == 3, true);
        })

        await stage2Test(videoArrayRes11, videoArrayRes22)

        return

        await stage2Test(videoArrayRes0011, videoArrayRes0022)
        
        return
        //the 2nd video in [video] of playlist in playlistToVideoMapClientSide above
        const d1 = await testDeleteVideoFromPlaylist(playlistArrRes[0], videoArrayRes11[2], videoIndex=2)
        const d2 = await testDeleteVideoFromPlaylist(playlistArrRes[1], videoArrayRes22[2], videoIndex=2)

        const videoArrayRes111 = await testGetVideosOfPlaylist(playlistArrRes[0])
        const videoArrayRes222 = await testGetVideosOfPlaylist(playlistArrRes[1])
        videoArrayRes111.sort((a,b)=>a.createdAt - b.createdAt) //ascending order
        videoArrayRes222.sort((a,b)=>a.createdAt - b.createdAt)

        await stage3Test(videoArrayRes111, videoArrayRes222)
        
        const d11 = await testDeleteVideoFromPlaylist(playlistArrRes[0], videoArrayRes111[0], videoIndex=0)
        const d22 = await testDeleteVideoFromPlaylist(playlistArrRes[1], videoArrayRes222[0], videoIndex=0)
        const videoArrayRes1111 = await testGetVideosOfPlaylist(playlistArrRes[0])
        const videoArrayRes2222 = await testGetVideosOfPlaylist(playlistArrRes[1])        
        
        await stage4Test(videoArrayRes111, videoArrayRes222)

        

        await cleanupTest()
    } catch (err) {
        await cleanupTest()
        throw ("error test", err.message)
    }
    process.exit()
}

setTimeout(()=>{testLol()}, 2500)

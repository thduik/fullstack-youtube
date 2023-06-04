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
const { stage1Test,stage2Test } = require('./test-cases')



const playlistArrayClientSide = []
//{playlist._id:[video]}
const playlistToVideoMapClientSide = new Map()



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
        //array of video obj json keys are {_id, playlistId,videoName}
        await stage1Test(videoArrayRes0, videoArrayRes1)

        //add function
        
        const r1 = await testAddVideoToPlaylist([playlistArrRes[0]], testVideoArr[0][0][1])
        const r2 = await testAddVideoToPlaylist([playlistArrRes[1]], testVideoArr[0][1][1])
        const r3 = await testAddVideoToPlaylist([playlistArrRes[0], playlistArrRes[1]], testVideoArr[0][0][2])

        const videoArrayRes11 = await testGetVideosOfPlaylist(playlistArrRes[0])
        const videoArrayRes22 = await testGetVideosOfPlaylist(playlistArrRes[1])        
        
        test('video array length == 3', () => {
            return assert.strictEqual(videoArrayRes11.length == 3 && videoArrayRes22.length == 3, true);
        })

        await stage2Test(videoArrayRes11, videoArrayRes22)
        

        //the 2nd video in [video] of playlist in playlistToVideoMapClientSide above
        console.log("videoToDelete videoName", videoToDelete.videoName)
        const deleteVideoRes = await testDeleteVideoFromPlaylist(playlist, videoToDelete, videoIndex)
        const videoArrayRes2 = await testGetVideosOfPlaylist(playlist)
        playlistToVideoMapClientSide.set(playlist._id, videoArrayRes2)
        const currVideoArray1 = playlistToVideoMapClientSide.get(playlist._id)
        console.log("currVideoArray1 afterDelete", currVideoArray1[0])
        await test(`${1}st video videoName start with Video 1`, () => {
            return assert.equal(currVideoArray1[0].videoName.substring(0,7), 'Video 1');
        })
        await test(`${2}nd video name start with Video 3, because Video 2 was deleted`, () => {
            return assert.equal(currVideoArray1[1].videoName.substring(0,7), 'Video 3');
        })
        await testDeleteVideoFromPlaylist(playlist, currVideoArray1[0])
        await testDeleteVideoFromPlaylist(playlist, currVideoArray1[1])
        const videoArrayRes3 = await testGetVideosOfPlaylist(playlist)
        await test(`after deleting all videos, resultArray should be empty`, () => {
            return assert.equal(videoArrayRes3.length, 0);
        })
        await cleanupTest()
    } catch (err) {
        await cleanupTest()
        throw ("error test", err.message)
    }

    process.exit()
}

setTimeout(()=>{testLol()}, 2500)

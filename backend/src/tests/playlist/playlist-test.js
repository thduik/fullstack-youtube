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
const { testCreatePlaylistWithError, videoDataArr, setupTest, cleanupTest,

    testPostAxios, testGetPlaylist, testGetVideosOfPlaylist,
    testAddVideoToPlaylist, testDeleteVideoFromPlaylist } = require('./playlist-functions')

const baseUrl = 'http://localhost:4444/test'

const assert = require('assert/strict');
const test = require('node:test')



const playlistArrayClientSide = []
//{playlist._id:[video]}
const playlistToVideoMapClientSide = new Map()



const testLol = async () => {

    try {
        await setupTest()
        await cleanupTest()

        const postRes = await testPostAxios()
        const playlistArrRes = await testGetPlaylist()
        await test('playlist object id type == string', () => {
            return assert.equal(typeof playlistArrRes[0]._id, 'string');
        })
        await test('playlist name == mockPlaylistName', () => {
            return assert.equal(playlistArrRes[0].playlistName, mockPlaylistName);
        })
        await test('playlist array length == 1', () => {
            return assert.strictEqual(playlistArrRes.length, 1);
        })



        
        const playlist = playlistArrRes[0]
        const videoArrayRes = await testGetVideosOfPlaylist(playlist)

        await test('video array length == 1', () => {
            return assert.strictEqual(videoArrayRes.length, 1);
        })
        await test('video object id type == string', () => {
            return assert.equal(typeof videoArrayRes[0]._id, 'string');
        })
        await test('video name == videoDataArr[0].videoName', () => {
            return assert.equal(videoArrayRes[0].videoName, videoDataArr[0].videoName);
        })

        const videoAddRes = await testAddVideoToPlaylist(playlist, videoDataArr[1])
        const videoAddRes1 = await testAddVideoToPlaylist(playlist, videoDataArr[2])
        const videoArrayRes1 = await testGetVideosOfPlaylist(playlist)
        playlistToVideoMapClientSide.set(playlist._id, videoArrayRes1)
        console.log("playlistToVideoMapClientSide stage 1 is", playlistToVideoMapClientSide.get(playlist._id))
        test('video array length == 3', () => {
            return assert.strictEqual(videoArrayRes1.length, 3);
        })

        for (var i = 0; i < 3; i++) {
            const videoObj = videoArrayRes1[i]
            console.log("videoArrayRes1[i] is", videoObj)
            await test(`${i}th video object id type == string`, () => {
                return assert.equal(typeof videoObj._id, 'string');
            })
            await test(`${i}th video name == videoDataArr${i}.videoName`, () => {
                return assert.equal(videoObj.videoName, videoDataArr[i].videoName);
            })
            await test(`${i}th videoId == videoDataArr${i}.videoId`, () => {
                return assert.equal(videoObj.videoId, videoDataArr[i].videoId);
            })
        }
        const videoIndex = 1
        //the 2nd video in [video] of playlist in playlistToVideoMapClientSide above
        const videoToDelete = playlistToVideoMapClientSide.get(playlist._id)[1]
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
        throw ("error test", err.message)
    }

    process.exit()
}

testLol()
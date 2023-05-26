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



const playlistArray = []




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



        // test('document name == John Doe', () => {
        //     return assert.notEqual(userData.name, 'John Doe');
        // });
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
        const videoAddRes1 = await testAddVideoToPlaylist(playlist, videoDataArr[1])
        const videoArrayRes1 = await testGetVideosOfPlaylist(playlist)

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
        const deleteVideoRes = await testDeleteVideoFromPlaylist(playlist, videoDataArr[1], videoIndex)
        const videoArrayRes2 = await testGetVideosOfPlaylist(playlist)
        console.log("videoArrayRes2AfterDelete", videoArrayRes2)

        await cleanupTest()
    } catch (err) {
        throw ("error test", err.message)
    }

    process.exit()
}

testLol()
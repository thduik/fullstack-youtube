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
const {testCreatePlaylistWithError,videoDataArr, testPostAxios, testGetPlaylist, setupTest, cleanupTest } = require('./playlist-functions')

const baseUrl = 'http://localhost:4444/test'




const playlistArray = []




const test = async () => {

    try {
        await setupTest()
        // const expectError = await testCreatePlaylistWithError()
        const postRes = await testPostAxios()
        const playlistArrRes = await testGetPlaylist()
        console.log("playlistRes success", playlistArrRes)
        playlistArray.concat(playlistArrRes)

        await cleanupTest()
    } catch (err) {
        throw ("error test", err.message)
    }

    process.exit()
}

test()
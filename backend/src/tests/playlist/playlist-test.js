//testing playlist crud functions, assuming correct identity and skipping identity checks
//order is create update delete
//because crud lies at the end of req/res handling, can directly test with api requests
//to /test/playlist endpoint 

const Playlist = require('../../models/Playlist')
const axios = require('axios')
const { mockUserId, mockPlaylistName } = require('../data')
const connectDB = require('../../db/connect-db')
const request = require("supertest")
const {testCreatePlaylistWithError,videoDataArr, testPostAxios, testGetPlaylist } = require('./playlist-functions')

const baseUrl = 'http://localhost:4444/test'




const mockUsername = 'testusername'



const cleanupTest = async () => {
    await Playlist.deleteMany({userid:mockUserId})
}

const test = async () => {

    try {
        await connectDB()
        // const expectError = await testCreatePlaylistWithError()
        const docc = await testPostAxios()
        const docs = await testGetPlaylist()
        
        await cleanupTest()
    } catch (err) {
        throw ("error test", err)
    }

    process.exit()
}

test()
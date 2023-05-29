const axios = require('axios')
const { mockUserId, mockPlaylistName } = require('../data')
const {testSearch, testSearchYoutube} = require('./search-functions')


const assert = require('assert/strict');
const test = require('node:test')

const testLol = async () => {

    try {
        // await setupTest()
        // await cleanupTest()

        const searchRes = await testSearchYoutube()
        const video =  searchRes.items[0]
        console.log("res is", searchRes.items[0].snippet)
        // await test('playlist object id type == string', () => {
        //     return assert.equal(typeof playlistArrRes[0]._id, 'string');
        // })
        // await test('playlist name == mockPlaylistName', () => {
        //     return assert.equal(playlistArrRes[0].playlistName, mockPlaylistName);
        // })
    } catch (err) {
        console.log("testLol error", err)
    }
}

testLol()
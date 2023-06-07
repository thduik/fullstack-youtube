const axios = require('axios')
const {testSearch, testSearchYoutube} = require('./search-functions')


const assert = require('assert/strict');
const test = require('node:test')

const testLol = async () => {

    try {
        // await setupTest()
        // await cleanupTest()

        const searchRes = await testSearch()
        const video =  searchRes.items[0]
        console.log("res is", searchRes.items[0].snippet)
      
    } catch (err) {
        console.log("testLol error", err)
    }
}

testLol()
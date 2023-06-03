// const { generateRandomString } = require("./src/utils/strings/generateRandomString");

// var myMap = new Map();

// const test_count = 1 * Math.pow(10, 6)//10 thousand




// const testlol = async () => {
//     const startTime = Date.now()
//     for (var i = 0; i <  test_count; i++) {
//        const res = generateRandomString(30)
//     }

//     console.log("test took", Date.now() - startTime, "ms")
// }

var ObjectID = require("bson-objectid");
const { testCreatePlaylist, testGetPlaylist,  cleanupTest, setupTest } = require("./src/tests/playlist");

const ntimes = 1000
const testlolol = async () => {
    await setupTest()
    const dateStart = Date.now()
    await testCreatePlaylist()
    for (var i = 0; i < ntimes; i ++) {
        await testGetPlaylist()
    }
    const timeTook = ( Date.now() - dateStart )
    console.log(`test ${ntimes} times took ${timeTook} ms (or ${timeTook/1000}) seconds`)
    await cleanupTest()
    process.exit()
}

testlolol()
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

const loginSchema = {}
const bcrypt = {}

var ObjectID = require("bson-objectid");
const { testCreatePlaylist, testGetPlaylist, cleanupTest, setupTest } = require("./src/tests/playlist");


const redis = require('redis')

let redisClient;

const connectCache = async () => {

    try {
        redisClient = redis.createClient();
        await redisClient.connect();
    } catch (err) {
        throw ("err connectCache", err)
    }

};


const testlolol = async () => {
    try {

        await connectCache()


        const obj = {
            _id: '647f2e9296eaef1ef5984b4c',
            playlistName: 'testUsername',
            userid: 'testUserId',
            length: 0,
            thumbnailUrl: 'https://i.ytimg.com/vi/4QYm50O7QXI/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBltQ9qu0QKDSmwidGAtZnfDT2XZA',
            //isPrivate: true,
            //isUnlisted: false,
            createdAt: 1686056592950,
            count: 1,
            __v: 0
          }
        const res2 = await redisClient.sMembers('set11ssasdasd2')
        const res3 = await redisClient.hSet('key1', obj)
        console.log("set of key set112 values are", res2, res3)
    } catch (err) {
        console.log("errrr", err)
    }
}

const benchmarkCreatePlaylist = async (ntimes = 1000) => {

    await setupTest()
    const dateStart = Date.now()
    await testCreatePlaylist()
    for (var i = 0; i < ntimes; i++) {
        await testGetPlaylist()
    }
    const timeTook = (Date.now() - dateStart)
    console.log(`test ${ntimes} times took ${timeTook} ms (or ${timeTook / 1000}) seconds`)
    await cleanupTest()
    process.exit()
}

testlolol()
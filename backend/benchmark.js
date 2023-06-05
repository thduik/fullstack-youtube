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
        redisClient.hSet('abcdef', {
            name: 'playlist1',
            thumbnail: 'abssudhsjds'
        })
        redisClient.hSet('playlist:abcdefghi', {
            name: 'playlist2',
            thumbnail: 'abssudhsjdsasdasd'
        })
        const res = await redisClient.hGet('abcdef','name')
        const res1 = await redisClient.hGetAll('abcdef')

        console.log("ress", JSON.stringify(res))
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
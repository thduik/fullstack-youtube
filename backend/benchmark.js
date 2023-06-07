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
const obj = {
    ss: 'aa',
    //isPrivate: true,
    //isUnlisted: false,
    createdAt: 1686056592950,
    count: 1,
    __v: 0
}

const testlolol = async () => {
    for (var i = 0; i < 5; i++) {



        try {

            await connectCache()
            const date0 = Date.now()
            await redisClient.hSet('key11', obj)
            await redisClient.hSet('key11', obj)

            const aa = await redisClient.hGetAll('key11')
            console.log(aa)

            console.log("took", Date.now() - date0, "ms")
        } catch (err) {
            console.log("errrr", err)
        }

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
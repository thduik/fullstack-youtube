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
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const testlolol = async () => {
    const date0 = Date.now()
    console.log("start")
    for (var i = 0; i < 300000; i++) {
       const lol = await typeof obj == 'object'
       if (!lol) {console.log("breaklol")}
    }
    console.log("done", Date.now() - date0)
    return
    console.log("\\\\")
    await connectCache()
    await redisClient.hSet("key1", obj)
    const res1 = await redisClient.hGetAll("key1")
    const res2 = await redisClient.hGetAll("key2")
    const r1 = await redisClient.exists("key1")
    const r2 = await redisClient.exists("key2")
    console.log("r1",r1, "r2", r2)
    if (!r2) {console.log("r2 not ok")}
    if (r1) {console.log("r1 ok")}
    console.log("res1", res1, "res2", res2)
    return


    for (var i = 0; i < 5; i++) {



        try {

            
            
            var keylol = "key11key11key11key11key11key11key11key11key11key11key11key11key11key11key11key11key11key11"
            for (var i = 0;i<3;i++) {keylol += keylol}

            const date0 = Date.now()
            
            await redisClient.hSet(keylol, obj)

            for (var i = 0; i < 30000; i++) {
                await redisClient.hGetAll(keylol)
            }
            //30k times, 5500ms

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